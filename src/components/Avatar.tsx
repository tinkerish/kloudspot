import Avatar from "@mui/material/Avatar";
import { getInitials } from "../lib/formatName";

const AvatarComponent = ({ name }: { name: string }) => {
  return (
    <div>
      <Avatar sx={{ width: 30, height: 30, fontSize: "", padding: "0.5rem" }}>
        {getInitials(name)}
      </Avatar>
    </div>
  );
};

export default AvatarComponent;
