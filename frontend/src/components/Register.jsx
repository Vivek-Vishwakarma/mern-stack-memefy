import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../redux/authAction";
import Loading from "./Loading";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toast from "./Toast";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [imgLoading, setimgLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  );
  const uploadImage = (e) => {
    setimgLoading(true);
    const imgData = new FormData();
    imgData.append("file", e.target.files[0]);
    imgData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
    imgData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);
    fetch(import.meta.env.VITE_BASE_URL, {
      method: "post",
      body: imgData,
    })
      .then((resp) => resp.json())
      .then((imgData) => {
        setUrl(imgData.url);
        setimgLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    dispatch(userRegister({ ...data, image: url }));
    if (!success) {
      return setOpen(true);
    }
  };
  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <ThemeProvider theme={theme}>
      <Toast open={open} setOpen={setOpen} />

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  onChange={handleChange}
                  required
                  fullWidth
                  id="firstName"
                  label="Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  onChange={handleChange}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => uploadImage(e)}
                  required
                  fullWidth
                  name="image"
                  type="file"
                  id="file"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  onChange={handleChange}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            {imgLoading ? (
              <Loading />
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
