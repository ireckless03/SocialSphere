import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

// LoginPage component representing the login page of the application
const LoginPage = () => {
  // Accessing the MUI theme and media query hook for screen size
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    // Container for the entire login page
    <Box>
      {/* Header section with the application name */}
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Social Sphere
        </Typography>
      </Box>

      {/* Main content section for the login form */}
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        {/* Title and description */}
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to SocialSpehere!
        </Typography>

        {/* Render the login form component */}
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
