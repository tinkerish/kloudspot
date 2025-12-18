import * as React from "react";
import { styled, type Theme, type CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));
const items = [
  {
    label: "Overview",
    path: "/dashboard",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.461 8.65999C19.4604 8.65953 19.4599 8.65892 19.4594 8.65846L11.301 0.500337C10.9533 0.152436 10.4909 -0.0390625 9.99912 -0.0390625C9.50733 -0.0390625 9.04499 0.152436 8.69709 0.500337L0.542929 8.65434C0.540183 8.65709 0.537283 8.65999 0.534689 8.66274C-0.179423 9.38097 -0.178202 10.5463 0.538199 11.2627C0.865501 11.5901 1.29763 11.7797 1.75982 11.7996C1.77874 11.8015 1.79766 11.8024 1.81674 11.8024H2.14175V17.8061C2.14175 18.9943 3.10855 19.961 4.29675 19.961H7.48859C7.81223 19.961 8.07453 19.6985 8.07453 19.375V14.668C8.07453 14.1259 8.51566 13.6849 9.05781 13.6849H10.9404C11.4826 13.6849 11.9236 14.1259 11.9236 14.668V19.375C11.9236 19.6985 12.1859 19.961 12.5095 19.961H15.7013C16.8897 19.961 17.8563 18.9943 17.8563 17.8061V11.8024H18.1579C18.6495 11.8024 19.1118 11.6109 19.4599 11.2628C20.1771 10.5454 20.1774 9.37792 19.461 8.65999ZM18.6312 10.4343C18.5047 10.5608 18.3365 10.6305 18.1579 10.6305H17.2704C16.9468 10.6305 16.6845 10.8928 16.6845 11.2165V17.8061C16.6845 18.3481 16.2435 18.7891 15.7013 18.7891H13.0954V14.668C13.0954 13.4798 12.1288 12.513 10.9404 12.513H9.05781C7.86945 12.513 6.90265 13.4798 6.90265 14.668V18.7891H4.29675C3.75476 18.7891 3.31363 18.3481 3.31363 17.8061V11.2165C3.31363 10.8928 3.05133 10.6305 2.72769 10.6305H1.85549C1.84634 10.6299 1.83733 10.6294 1.82803 10.6293C1.65347 10.6262 1.48974 10.557 1.36706 10.4341C1.10613 10.1732 1.10613 9.74856 1.36706 9.48748C1.36721 9.48748 1.36721 9.48732 1.36736 9.48717L1.36782 9.48671L9.52595 1.32889C9.65229 1.2024 9.82029 1.13281 9.99912 1.13281C10.1778 1.13281 10.3458 1.2024 10.4723 1.32889L18.6286 9.48503C18.6298 9.48626 18.6312 9.48748 18.6324 9.4887C18.892 9.75008 18.8915 10.1738 18.6312 10.4343Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    label: "Crowd Entries",
    path: "/dashboard/crowd-entries",
    icon: (
      <svg
        width="19"
        height="19"
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.175 0H3.575C2.62736 0.00165239 1.719 0.378834 1.04892 1.04892C0.378834 1.719 0.00165239 2.62736 0 3.575V15.175C0.00165239 16.1226 0.378834 17.031 1.04892 17.7011C1.719 18.3712 2.62736 18.7483 3.575 18.75H15.175C16.1226 18.7483 17.031 18.3712 17.7011 17.7011C18.3712 17.031 18.7483 16.1226 18.75 15.175V3.575C18.7483 2.62736 18.3712 1.719 17.7011 1.04892C17.031 0.378834 16.1226 0.00165239 15.175 0ZM17.5 15.175C17.4984 15.7911 17.2529 16.3815 16.8172 16.8172C16.3815 17.2529 15.7911 17.4984 15.175 17.5H3.575C2.95888 17.4984 2.36846 17.2529 1.9328 16.8172C1.49713 16.3815 1.25165 15.7911 1.25 15.175V3.575C1.25165 2.95888 1.49713 2.36846 1.9328 1.9328C2.36846 1.49713 2.95888 1.25165 3.575 1.25H15.175C15.7911 1.25165 16.3815 1.49713 16.8172 1.9328C17.2529 2.36846 17.4984 2.95888 17.5 3.575V15.175Z"
          fill="white"
        />
        <path
          d="M15 10.525C14.8342 10.525 14.6753 10.5908 14.5581 10.7081C14.4408 10.8253 14.375 10.9842 14.375 11.15V13.4937L5.25625 4.375H7.6C7.76576 4.375 7.92473 4.30915 8.04194 4.19194C8.15915 4.07473 8.225 3.91576 8.225 3.75C8.225 3.58424 8.15915 3.42527 8.04194 3.30806C7.92473 3.19085 7.76576 3.125 7.6 3.125H3.55625C3.44188 3.125 3.33219 3.17044 3.25131 3.25131C3.17044 3.33219 3.125 3.44188 3.125 3.55625V7.6C3.125 7.76576 3.19085 7.92473 3.30806 8.04194C3.42527 8.15915 3.58424 8.225 3.75 8.225C3.91576 8.225 4.07473 8.15915 4.19194 8.04194C4.30915 7.92473 4.375 7.76576 4.375 7.6V5.25625L13.4937 14.375H11.15C10.9842 14.375 10.8253 14.4408 10.7081 14.5581C10.5908 14.6753 10.525 14.8342 10.525 15C10.525 15.1658 10.5908 15.3247 10.7081 15.4419C10.8253 15.5592 10.9842 15.625 11.15 15.625H15.1937C15.3081 15.625 15.4178 15.5796 15.4987 15.4987C15.5796 15.4178 15.625 15.3081 15.625 15.1937V11.15C15.625 10.9842 15.5592 10.8253 15.4419 10.7081C15.3247 10.5908 15.1658 10.525 15 10.525Z"
          fill="white"
        />
      </svg>
    ),
  },
];
export default function Sidebar({
  open,
  handleDrawerOpen,
}: {
  open: boolean;
  handleDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const handleDrawerToggle = () => {
    handleDrawerOpen((prev) => !prev);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "#282829",
          backgroundImage:
            "radial-gradient(130.14% 50% at 50% 50%, #0A5D5C 0%, #282829 100%)",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundPosition: "top 15% right, center",
          backgroundSize: "cover, cover",
        },
      }}
    >
      <img
        src="/sidebar-bg.svg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        style={{
          visibility: open ? "visible" : "hidden",
          position: "absolute",
          top: "15%",
          right: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DrawerHeader
          sx={{
            justifyContent: open ? "space-between" : "center",
            padding: "20px",
          }}
        >
          {open && (
            <div
              className={`bg-transparent flex items-center justify-center gap-1 font-medium text-white`}
            >
              <svg
                width="25"
                height="32"
                viewBox="0 0 25 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.7504 3.48919C16.8667 -0.380815 9.89024 -1.14081 5.22589 1.75919C1.76266 3.90918 0.411397 7.24918 0.0210332 11.2392C-0.359322 18.7392 4.46518 26.3692 10.741 30.7192C13.0432 32.3192 13.2534 30.6892 12.7429 30.1592C11.6619 29.0492 9.21961 26.0492 8.8793 24.9792C8.17864 22.6792 9.05947 21.1992 11.4517 21.2392C12.873 21.2692 14.3244 21.1892 15.7157 20.9192C19.5192 20.1792 22.3619 18.1592 23.5129 14.3192C24.7341 10.1992 23.8032 6.52918 20.7504 3.48919ZM11.5818 14.0992C11.4817 14.6592 11.2315 15.1392 10.8311 15.5492C10.5509 15.8392 9.03945 17.3392 8.86929 17.5092C8.85928 17.5192 8.84927 17.5292 8.83926 17.5392C8.82925 17.5292 8.81924 17.5192 8.80923 17.5092C8.16863 16.8692 7.51803 16.2192 6.86742 15.5692C6.80737 15.5092 6.74731 15.4492 6.69726 15.3892C6.33693 14.9492 6.12673 14.4592 6.06667 13.8892C6.03665 13.6192 6.04665 13.3492 6.0967 13.0892C6.22682 12.4492 6.53711 11.9092 7.02757 11.4892C7.47799 11.1092 7.99848 10.8992 8.58903 10.8392C8.84927 10.8192 9.11952 10.8292 9.36976 10.8792C10.0304 11.0192 10.5909 11.3392 11.0113 11.8592C11.5318 12.5292 11.7119 13.2792 11.5818 14.0992ZM13.4436 13.9292C13.3735 11.3892 11.4217 9.42918 8.86929 9.35919C7.66817 9.32919 7.66817 7.46918 8.86929 7.50918C12.4326 7.60918 15.2052 10.3592 15.2953 13.9292C15.3353 15.1192 13.4736 15.1192 13.4436 13.9292ZM16.8968 13.4892C16.7867 9.40918 13.6337 6.25918 9.54992 6.14918C8.3488 6.11918 8.3488 4.25918 9.54992 4.29918C14.6547 4.42918 18.6184 8.39918 18.7485 13.4892C18.7785 14.6792 16.9268 14.6792 16.8968 13.4892Z"
                  fill="white"
                />
              </svg>
              <h2>kloudspot</h2>
            </div>
          )}
          <IconButton onClick={handleDrawerToggle}>
            {open ? (
              <ChevronRightIcon className="text-white" />
            ) : (
              <MenuIcon className="text-white" />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          {items.map(({ label, path, icon }) => {
            const active = location.pathname === path;
            return (
              <ListItem key={path} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  onClick={() => navigate(path)}
                  sx={[
                    {
                      minHeight: 48,
                      px: 2.5,
                      backgroundColor: active ? "#FFFFFF4D" : "transparent",
                      "&:hover": {
                        backgroundColor: active ? "#FFFFFF4D" : "transparent",
                      },
                    },

                    open
                      ? {
                          mx: "12px",
                          borderRadius: "4px",
                          justifyContent: "initial",
                        }
                      : {
                          justifyContent: "center",
                        },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      {
                        minWidth: 0,
                        justifyContent: "center",
                      },
                      open
                        ? {
                            mr: 3,
                          }
                        : {
                            mr: "auto",
                          },
                    ]}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    sx={[
                      open
                        ? {
                            opacity: 1,
                            color: "white",
                          }
                        : {
                            opacity: 0,
                          },
                    ]}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Box sx={{ mt: "auto", pb: 2 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleLogout}
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                    color: "white",
                  },
                  open
                    ? {
                        mx: "12px",
                        borderRadius: "4px",
                        justifyContent: "initial",
                      }
                    : {
                        justifyContent: "center",
                      },
                ]}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.99105 1.66656C9.88147 1.66764 9.77317 1.69039 9.67236 1.73356C9.57155 1.77672 9.48021 1.83944 9.40356 1.9181C9.3269 1.99677 9.26644 2.08988 9.22564 2.19204C9.18484 2.2942 9.1645 2.4034 9.16577 2.51346V9.21185C9.16584 9.43404 9.25375 9.64714 9.4102 9.80423C9.56664 9.96132 9.77879 10.0495 10 10.0495C10.2212 10.0495 10.4334 9.96132 10.5898 9.80423C10.7463 9.64714 10.8342 9.43404 10.8342 9.21185V2.51346C10.8355 2.40188 10.8146 2.29115 10.7727 2.18781C10.7308 2.08447 10.6687 1.99057 10.5902 1.91166C10.5116 1.83276 10.4181 1.77046 10.3153 1.72837C10.2124 1.68627 10.1021 1.66526 9.99105 1.66656ZM14.8532 3.34565C14.826 3.34487 14.7989 3.34541 14.7718 3.34729C14.607 3.36134 14.4501 3.42432 14.3211 3.52818C14.192 3.63204 14.0967 3.77208 14.0471 3.93053C13.9975 4.08899 13.996 4.25872 14.0428 4.41805C14.0895 4.57737 14.1823 4.71913 14.3095 4.8253C15.7532 6.05667 16.6665 7.88943 16.6665 9.94754C16.6665 13.6637 13.6956 16.659 10.0041 16.659C6.31255 16.659 3.33512 13.6637 3.33512 9.94754C3.33513 7.90134 4.23685 6.08102 5.66608 4.84981C5.74935 4.77842 5.8178 4.69123 5.86753 4.59327C5.91726 4.49531 5.94729 4.38848 5.95591 4.27887C5.96452 4.16925 5.95156 4.05905 5.91776 3.95447C5.88396 3.84988 5.82998 3.75301 5.7589 3.66938C5.68782 3.58575 5.60104 3.51699 5.50351 3.46705C5.40598 3.41711 5.29961 3.38689 5.19047 3.37824C5.08134 3.36958 4.97158 3.38263 4.86745 3.41659C4.76333 3.45054 4.66688 3.50475 4.58362 3.57614C2.7995 5.11309 1.66668 7.40398 1.66667 9.94754C1.66666 14.567 5.41024 18.3332 10.0041 18.3332C14.5979 18.3332 18.3333 14.567 18.3333 9.94754C18.3333 7.38915 17.1893 5.08883 15.3871 3.55163C15.2389 3.42187 15.0498 3.34892 14.8532 3.34565Z"
                      fill="white"
                    />
                  </svg>
                </ListItemIcon>

                <ListItemText
                  primary="Logout"
                  sx={{
                    opacity: open ? 1 : 0,
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Drawer>
  );
}
