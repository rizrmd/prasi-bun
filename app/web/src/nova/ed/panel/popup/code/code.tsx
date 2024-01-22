import { useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { isLocalhost } from "../../../../../utils/ui/is-localhost";
import { Loading } from "../../../../../utils/ui/loading";
import { Modal } from "../../../../../utils/ui/modal";
import { Popover } from "../../../../../utils/ui/popover";
import { Tooltip } from "../../../../../utils/ui/tooltip";
import { EDGlobal } from "../../../logic/ed-global";
import { CodeAssign } from "./assign";
import {
	iconChevronDown,
	iconGear,
	iconLoading,
	iconLog,
	iconNewTab,
	iconTrash,
} from "./icons";
import { CodeNameItem, CodeNameList, codeName } from "./name-list";

export const code = {
	mode: "" as "" | "old" | "new",
};

export const EdPopCode = () => {
	const p = useGlobal(EDGlobal, "EDITOR");

	useEffect(() => {
		(async () => {
			if (code.mode === "new") {
				if (p.ui.popup.code.open) {
					const id_code = await p.sync.activity("site", {
						action: p.ui.popup.code.open ? "open" : "close",
						id: p.site.id,
						type: "code",
						name: p.ui.popup.code.name,
					});

					if (id_code) {
						p.ui.popup.code.id = id_code;
						p.render();
					}
				}
				p.ui.popup.code.init = true;
			}
		})();
	}, [p.ui.popup.code.open]);

	useEffect(() => {
		if (code.mode === "") {
			db.code.findFirst({ where: { id_site: p.site.id } }).then((e) => {
				code.mode = e ? "new" : "old";

				if (localStorage.vsc_opened === "yes") {
					localStorage.removeItem("vsc_opened");
					p.ui.popup.code.open = true;
				}

				p.render();
			});
		}
	}, []);

	return (
		<Modal
			fade={false}
			open={p.ui.popup.code.open}
			onOpenChange={(open) => {
				localStorage.removeItem("vsc_opened");

				if (!open) {
					p.ui.popup.code.open = false;
					p.render();
				}
			}}
		>
			<div
				className={cx("bg-white select-none fixed inset-[50px] bottom-0 flex")}
			>
				{!code.mode && <Loading note="checking-version" backdrop={false} />}
				{code.mode === "new" && <CodeBody />}
				{code.mode === "old" && (
					<div className="flex items-center justify-center flex-col flex-1">
						<div>This site still using old code</div>
						<div
							onClick={() => {
								if (
									confirm(
										"Old code will not load, are you sure want to upgrade ?",
									)
								) {
									code.mode = "new";
									p.ui.popup.code.open = false;
									p.render();
								}
							}}
							className="border border-blue-500 cursor-pointer bg-blue-100 p-2 hover:bg-blue-200"
						>
							Upgrade to New Code Project
						</div>
						<div className="text-xs py-2">
							Warning: old code will not load once upgraded.
						</div>
					</div>
				)}
			</div>
		</Modal>
	);
};

const CodeBody = () => {
	const p = useGlobal(EDGlobal, "EDITOR");
	const local = useLocal({ namePicker: false, codeAssign: false });

	const vscode_url = isLocalhost()
		? "http://localhost:3000?"
		: "https://prasi-vsc.avolut.com/?tkn=prasi&";

	const code_mode = p.site.code.mode;

	return (
		<div className="relative w-full h-full flex flex-col">
			<div className="border-b flex justify-between h-[40px] items-stretch">
				<div className="flex items-stretch">
					<Popover
						placement="bottom"
						offset={0}
						arrow={false}
						backdrop={false}
						content={
							<CodeNameList
								onPick={async (e) => {
									local.namePicker = false;
									p.ui.popup.code.name = e.name;
									p.ui.popup.code.id = "";
									p.render();

									const id_code = await p.sync.activity("site", {
										action: "open",
										id: p.site.id,
										type: "code",
										name: p.ui.popup.code.name,
									});

									if (id_code) {
										p.ui.popup.code.id = id_code;
										p.render();
									}
								}}
							/>
						}
						popoverClassName="bg-white shadow-md"
						className={cx(
							"flex items-center px-2 w-[200px] hover:bg-blue-50  space-x-1",
							"cursor-pointer justify-between",
						)}
						open={local.namePicker}
						onOpenChange={(open) => {
							local.namePicker = open;
							local.render();
						}}
					>
						<div className="capitalize overflow-ellipsis flex-1 flex items-center space-x-2">
							<CodeNameItem name={p.ui.popup.code.name} />
						</div>
						<div
							dangerouslySetInnerHTML={{
								__html: iconChevronDown,
							}}
						></div>
					</Popover>

					{p.ui.popup.code.name !== "site" &&
						p.ui.popup.code.name !== "SSR" && (
							<>
								<Tooltip
									content={"Delete Code Module"}
									className="flex items-center border-l relative hover:bg-red-50 cursor-pointer px-2 transition-all text-red-500"
									placement="bottom"
									onClick={async () => {
										if (
											prompt(
												"Are you sure want to delete this code?\ntype 'yes' to confirm:",
											) === "yes"
										) {
											await db.code.delete({
												where: { id: p.ui.popup.code.id },
											});

											codeName.list = codeName.list.filter(
												(e) => e.id !== p.ui.popup.code.id,
											);

											p.ui.popup.code.name = codeName.list[0].name;
											p.ui.popup.code.id = codeName.list[0].id;
											p.render();
										}
									}}
								>
									<div
										dangerouslySetInnerHTML={{
											__html: iconTrash,
										}}
									></div>
								</Tooltip>
								<Popover
									open={local.codeAssign}
									onOpenChange={(open) => {
										local.codeAssign = open;
										local.render();
									}}
									backdrop={false}
									placement="bottom"
									popoverClassName="p-0 shadow-lg bg-white"
									content={
										<CodeAssign
											onClose={() => {
												local.codeAssign = false;
												local.render();
											}}
											id_code={p.ui.popup.code.id}
										/>
									}
									className="flex items-center border-l relative hover:bg-blue-50 cursor-pointer px-2 transition-all"
								>
									<div
										dangerouslySetInnerHTML={{
											__html: iconGear,
										}}
									></div>
								</Popover>
							</>
						)}
					<Tooltip
						content="STDOUT Log"
						delay={0}
						placement="bottom"
						className={cx(
							"flex items-stretch relative border-l",
							p.ui.popup.code.error && "bg-red-500 text-white",
						)}
						onClick={() => {
							p.ui.popup.code.show_log = !p.ui.popup.code.show_log;
							p.render();
						}}
					>
						{p.ui.popup.code.show_log && (
							<div className="absolute bottom-[-4px] left-0 right-[1px] h-[5px] bg-white"></div>
						)}
						<div
							className={cx(
								"border-r flex text-center items-center hover:bg-blue-50 cursor-pointer px-2 transition-all",
								p.ui.popup.code.loading
									? "border-b-2 border-b-orange-400"
									: "border-b-2 border-b-transparent",
							)}
							dangerouslySetInnerHTML={{
								__html: p.ui.popup.code.loading ? iconLog : iconLoading,
							}}
						></div>
					</Tooltip>
					<Tooltip
						content="Open in new tab"
						delay={0}
						placement="bottom"
						className={cx("flex items-stretch relative border-l")}
						onClick={() => {
							window.open(
								`${vscode_url}folder=/site/code/${p.site.id}/${p.ui.popup.code.id}`,
							);
						}}
					>
						<div dangerouslySetInnerHTML={{ __html: iconNewTab }}></div>
					</Tooltip>
				</div>
				<div className="flex items-center">
					{code_mode === "vsc" && (
						<div
							className="flex items-center p-[2px] px-2 mr-2 cursor-pointer text-[11px] space-x-1 hover:bg-blue-100 hover:border-slate-200 border border-transparent transition-all"
							onClick={async () => {
								if (
									confirm(
										"Are you sure want to turn off VSCode?\nThis will enable old npm module",
									)
								) {
									localStorage.vsc_opened = "yes";
									await db.site.update({
										where: { id: p.site.id },
										data: { code_mode: "old" },
									});
									location.reload();
								}
							}}
						>
							<svg
								width="15"
								height="15"
								viewBox="0 0 15 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M10.5 4C8.567 4 7 5.567 7 7.5C7 9.433 8.567 11 10.5 11C12.433 11 14 9.433 14 7.5C14 5.567 12.433 4 10.5 4ZM7.67133 11C6.65183 10.175 6 8.91363 6 7.5C6 6.08637 6.65183 4.82498 7.67133 4H4.5C2.567 4 1 5.567 1 7.5C1 9.433 2.567 11 4.5 11H7.67133ZM0 7.5C0 5.01472 2.01472 3 4.5 3H10.5C12.9853 3 15 5.01472 15 7.5C15 9.98528 12.9853 12 10.5 12H4.5C2.01472 12 0 9.98528 0 7.5Z"
									fill="currentColor"
									fillRule="evenodd"
									clipRule="evenodd"
								></path>
							</svg>
							<div>Turn off VSCode</div>
						</div>
					)}
				</div>
			</div>
			{p.ui.popup.code.show_log && (
				<div className="h-[150px] overflow-auto font-mono p-2 text-xs whitespace-pre-wrap border-b">
					<div>{p.ui.popup.code.log || "stdout is empty..."}</div>
				</div>
			)}

			{code_mode === "vsc" ? (
				<div className="flex flex-1 relative">
					{!p.ui.popup.code.open || !p.ui.popup.code.id ? (
						<Loading backdrop={false} />
					) : (
						<>
							<iframe
								className="flex flex-1 absolute inset-0 w-full h-full z-10"
								src={`${vscode_url}folder=/site/code/${p.site.id}/${p.ui.popup.code.id}`}
							></iframe>
							<div className="flex flex-1 absolute inset-0 z-0 items-center justify-center">
								Loading VSCode...
							</div>
						</>
					)}
				</div>
			) : (
				<div className="flex flex-col flex-1 relative items-center justify-center space-y-2">
					<div className="text-xs">VSCode is turned off</div>
					<div
						className="flex items-center p-2 cursor-pointer text-xs font-mono space-x-1 bg-green-700 text-white hover:opacity-40 transition-all"
						onClick={async () => {
							if (
								confirm(
									"Are you sure want to turn on VSCode?\nThis will disable old npm module (you can enable it again later).",
								)
							) {
								localStorage.vsc_opened = "yes";
								await db.site.update({
									where: { id: p.site.id },
									data: { code_mode: "vsc" },
								});
								location.reload();
							}
						}}
					>
						<div>Turn on VSCode</div>
					</div>
				</div>
			)}

			{(local.namePicker || local.codeAssign) && (
				<div
					className="fixed inset-0 z-50"
					onClick={() => {
						local.namePicker = false;
						local.codeAssign = false;
						local.render();
					}}
				></div>
			)}
		</div>
	);
};
