import {
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { signin } from "./service/ApiService";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this); // 클래스로 생성한 컴포넌트는 메서드를 자동으로 바인딩하지 않는다. 생성자에서 직접 바인딩 필요
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get("email");
    const password = data.get("password");
    console.log(email, password);
    signin({ email: email, password: password });
  }

  render() {
    return (
      <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5">
              로그인
            </Typography>
          </Grid>
        </Grid>
        <form noValidate onSubmit={this.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="email"
                label="이메일 주소"
                id="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="패스워드"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                type="submit"
              >
                로그인
              </Button>
            </Grid>
            <Link href="/signup" variant="body2">
              <Grid item>계정이 없습니까? 여기서 가입하세요.</Grid>
            </Link>
          </Grid>
        </form>
      </Container>
    );
  }
}

export default Login;
