import { IconButton, Skeleton } from "@mui/material";
import { useAlerts } from "../hooks/useAlerts";

type Props = {
  handleAlertDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  alertDrawerOpen: boolean;
  loading: boolean;
  error: boolean;
};

const Notification = ({
  handleAlertDrawer,
  alertDrawerOpen,
  loading,
  error,
}: Props) => {
  const { unreadCount } = useAlerts();
  const isDisabled = loading || error;

  return (
    <IconButton
      sx={{
        position: "relative",
        padding: "2px",
        opacity: isDisabled ? 0.5 : 1,
        pointerEvents: isDisabled ? "none" : "auto",
      }}
      onClick={() => handleAlertDrawer(true)}
      disabled={isDisabled}
    >
      {loading ? (
        <Skeleton variant="circular" width={28} height={28} />
      ) : (
        <>
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.874 11.3278V10.5058C21.874 5.99227 18.3487 2.33333 14 2.33333C9.65132 2.33333 6.12602 5.99227 6.12602 10.5058V11.3278C6.12602 12.3144 5.84467 13.2788 5.31743 14.0996L4.02542 16.1111C2.84529 17.9484 3.74622 20.4457 5.79876 21.0267C11.1682 22.5466 16.8318 22.5466 22.2012 21.0267C24.2538 20.4457 25.1547 17.9484 23.9746 16.1111L22.6826 14.0996C22.1553 13.2788 21.874 12.3144 21.874 11.3278Z"
              stroke="#030303"
            />
            <path
              d="M8.75 22.1667C9.5142 24.2058 11.5762 25.6667 14 25.6667C16.4238 25.6667 18.4858 24.2058 19.25 22.1667"
              stroke="#030303"
              strokeLinecap="round"
            />
          </svg>
          <div
            className={`absolute top-0 right-1.5 ${
              unreadCount > 0 && !alertDrawerOpen && !isDisabled
                ? "opacity-100"
                : "opacity-0"
            }`}
          >
            <svg width="8" height="8">
              <circle cx="4" cy="4" r="4" fill="#FF5E61" />
            </svg>
          </div>
        </>
      )}
    </IconButton>
  );
};

export default Notification;
