import { Popover } from "../../../../utils/ui/popover";

export const EdPopUser = (users: { id: string; username: string }[]) => {
  return (
    <Popover>
      <div className="ed-pop-user">
        <div className="ed-pop-user-list">
          {users.map((user) => (
            <div key={user.id} className="ed-pop-user-item">
              <div className="ed-pop-user-item-avatar">
                <img src="" alt="" />
              </div>
              <div className="ed-pop-user-item-username">{user.username}</div>
            </div>
          ))}
        </div>
      </div>
    </Popover>
  );
};
