import { FormControlLabel, styled, Switch } from "@mui/material";

// const Android12Switch = styled(Switch)(({ theme }) => ({
//   padding: 8,
//   "& .MuiSwitch-track": {
//     borderRadius: 22 / 2,
//     "&::before, &::after": {
//       content: '""',
//       position: "absolute",
//       top: "50%",
//       transform: "translateY(-50%)",
//       width: 16,
//       height: 16,
//     },
//     "&::before": {
//       backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
//         theme.palette.getContrastText(theme.palette.primary.main)
//       )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
//       left: 12,
//     },
//     "&::after": {
//       backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
//         theme.palette.getContrastText(theme.palette.primary.main)
//       )}" d="M19,13H5V11H19V13Z" /></svg>')`,
//       right: 12,
//     },
//   },
//   "& .MuiSwitch-thumb": {
//     boxShadow: "none",
//     width: 16,
//     height: 16,
//     margin: 2,
//   },
// }));
// import { styled, Switch } from "@mui/material";

// const LanguageSwitch = styled(Switch)(({ theme }) => ({
//   width: 72,
//   height: 36,
//   padding: 0,

//   "& .MuiSwitch-switchBase": {
//     padding: 2,
//     transition: theme.transitions.create(["transform"], {
//       duration: 200,
//     }),

//     "&.Mui-checked": {
//       transform: "translateX(36px)",
//       color: "#fff",

//       "& + .MuiSwitch-track": {
//         backgroundColor: "#0A5D5C",
//       },
//     },
//   },

//   "& .MuiSwitch-thumb": {
//     width: 32,
//     height: 32,
//     backgroundColor: "#fff",
//     boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
//   },

//   "& .MuiSwitch-track": {
//     borderRadius: 18,
//     backgroundColor: "#1F2933",
//     opacity: 1,
//     position: "relative",

//     "&::before": {
//       content: '"EN"',
//       position: "absolute",
//       left: 10,
//       top: "50%",
//       transform: "translateY(-50%)",
//       fontSize: 12,
//       fontWeight: 600,
//       color: "#fff",
//     },

//     "&::after": {
//       content: '"FR"',
//       position: "absolute",
//       right: 10,
//       top: "50%",
//       transform: "translateY(-50%)",
//       fontSize: 12,
//       fontWeight: 600,
//       color: "#fff",
//     },
//   },
// }));
// import { styled, Switch } from "@mui/material";

const LanguageSwitch = styled(Switch)(({ theme }) => ({
  width: 76,
  height: 38,
  padding: 0,
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    opacity: 1,
    borderRadius: 24,
  },

  "& .MuiSwitch-switchBase + .MuiSwitch-track": {
    opacity: 1,
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    transition: theme.transitions.create("transform", {
      duration: 200,
    }),

    "&.Mui-checked": {
      transform: "translateX(38px)",
      opacity: 1,
    },
  },

  "& .MuiSwitch-thumb": {
    width: 33,
    height: 33,
    backgroundColor: "#47B2B0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 700,
    color: "#fff",
    "&::before": {
      content: '"EN"',
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb::before": {
    content: '"FR"',
  },

  "& .MuiSwitch-track": {
    backgroundColor: "transparent",
    border: "1px solid #9CA3AF",
    borderRadius: 24,
    position: "relative",

    "&::before": {
      content: '"EN"',
      position: "absolute",
      left: 10,
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: 12,
      fontWeight: 600,
      color: "black",
      pointerEvents: "none",
      opacity: 1,
    },

    "&::after": {
      content: '"FR"',
      position: "absolute",
      right: 10,
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: 12,
      fontWeight: 600,
      color: "black",
      pointerEvents: "none",
    },
  },
}));

const Language = () => {
  return (
    <FormControlLabel
      sx={{
        marginLeft: "0",
        marginRight: "0",
      }}
      control={<LanguageSwitch defaultChecked color="default" />}
      label=""
    />
  );
};

export default Language;
