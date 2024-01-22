import { dir } from "dir";
import { dirAsync } from "fs-jetpack";
import { g } from "utils/global";
import { Doc } from "yjs";
import { DCode } from "../../../../../web/src/utils/types/root";
import { readDirectoryRecursively } from "../../../../api/site-export";
import { docs } from "../../entity/docs";
import { existsAsync } from "fs-jetpack";
import { snapshot } from "../../entity/snapshot";
export type DBCode = Exclude<Awaited<ReturnType<typeof getCode>>, null>;

export const prepCode = async (site_id: string, name: string) => {
	let code = await getCode(site_id, name);

	const pkgfile = Bun.file(
		dir.path(`${g.datadir}/site/code/${site_id}/package.json`),
	);
	if (!(await pkgfile.exists())) {
		await dirAsync(dir.path(`${g.datadir}/site/code/${site_id}`));
		await Bun.write(
			pkgfile,
			JSON.stringify(
				{
					name: "code",
					workspaces: ["./*"],
				},
				null,
				2,
			),
		);
	}

	if (code) {
		await dirAsync(dir.path(`${g.datadir}/site/code/${site_id}/${code.id}`));
		await prepDCode(site_id);
		return code;
	}
	let new_code = await db.code.create({
		data: {
			id_site: site_id,
		},
	});

	await db.code_file.create({
		data: {
			id_code: new_code.id,
			path: "index.tsx",
			content: `\
export const hello_world = () => {
  console.log('hello world')
}`,
		},
	});

	await db.code_file.create({
		data: {
			id_code: new_code.id,
			path: "package.json",
			content: JSON.stringify(
				{
					name: new_code.id,
					dependencies: {},
				},
				null,
				2,
			),
		},
	});

	code = await getCode(site_id);

	await prepDCode(site_id);

	return code as DBCode;
};

export const getCode = async (site_id: string, name?: string) => {
	return await db.code.findFirst({
		where: name
			? { id_site: site_id, name }
			: {
					id_site: site_id,
			  },
		select: {
			id: true,
			id_site: true,
			name: true,
			code_file: true,
		},
	});
};

export const prepDCode = async (site_id: string) => {
	let exists = false;
	if (!docs.code[site_id]) {
		const code = await getCode(site_id, "site");

		if (code) {
			const path = {
				src: dir.path(`${g.datadir}/site/code/${site_id}/${code.id}`),
				build: dir.path(`${g.datadir}/site/build/${code.id}`),
			};

			if ((await existsAsync(path.src)) && (await existsAsync(path.build))) {
				docs.code[site_id] = {
					id: site_id,
					src: loadFolderAsDCode(code.id, path.src),
					build: loadFolderAsDCode(code.id, path.build),
				};
				exists = true;
			}
		}
	}

	if (exists) {
		const chmod = Bun.spawn({
			cmd: ["chmod", "-R", "777", "."],
			cwd: dir.path(`${g.datadir}/site`),
		});

		await chmod.exited;

		const src_bin = Y.encodeStateAsUpdate(docs.code[site_id].src as Doc);
		const build_bin = Y.encodeStateAsUpdate(docs.code[site_id].build as Doc);

		let snap = await snapshot.getOrCreate({
			type: "site",
			id: site_id,
			name: "",
			src: {
				bin: src_bin,
				id_doc: docs.code[site_id].src.clientID,
			},
			build: {
				bin: build_bin,
				id_doc: docs.code[site_id].build.clientID,
			},
		});

		if (snap && snap.type === "site") {
			return {
				bin: {
					src: snap.src.bin,
					build: snap.build.bin,
				},
			};
		}
	}
};

const loadFolderAsDCode = (id: string, path: string) => {
	const doc = new Y.Doc() as DCode;
	const map = doc.getMap("map");

	const files = new Y.Map();

	const dirs = readDirectoryRecursively(path);
	for (const [k, v] of Object.entries(dirs)) {
		files.set(k, new Y.Text(v));
	}

	doc.transact(() => {
		map.set("files", files as any);
		map.set("id", id);
	});

	return doc;
};
