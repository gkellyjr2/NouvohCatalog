//import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import axiosUserAccountHelpers from '../../app/apihelpers/axiosAccountHelpers';
import { LoadingButton } from '@mui/lab';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="http://nouvoh.com/">
        Nouvoh Corporation
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function LoginAUser(){
  const {register, handleSubmit, formState: {isSubmitting, errors, isValid}, } = useForm({defaultValues: {userName:"", password: ""}}); // Custom hook to manipulate form fields

  async function submitFormValues(data: FieldValues) {
    try {
      await axiosUserAccountHelpers.UserAccountAPIs.userLogin(data.userName, data.password);
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  }
  
  return (
      <Container component={Paper} maxWidth="xs" sx={{display:'flex', flexDirection:'column', alignItems:'center', p:4, mt:8}}>
        <Box
          sx={{
            
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(submitFormValues)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="User Name"
              autoComplete="email"
              autoFocus
              {...register("userName", {required: "A valid user name is required"})}
              error={errors.userName?.message ? true : false}
              helperText={errors.userName?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              {...register("password", {required: "A valid password is required", 
              minLength: {value: 8, message: "Password must be at least 8 characters long"}})}
              error={errors.password?.message ? true : false}
              helperText={errors.password?.message}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <LoadingButton
              loading={isSubmitting}
              disabled={!isValid || isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                <Link to="#">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
              <Link to="/register">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8}} />
      </Container>
  );
}