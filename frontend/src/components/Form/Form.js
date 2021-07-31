import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({Name: '', Age: '', Symptoms: '', contact: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({Name: '', Age: '', Symptoms: '',contact: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Patient details'}</Typography>
        <TextField name="Name" variant="outlined" label="Name" fullWidth value={postData.Name} onChange={(e) => setPostData({ ...postData,Name: e.target.value })} />
        <TextField name="Age" variant="outlined" label="Age" fullWidth value={postData.Age} onChange={(e) => setPostData({ ...postData,Age: e.target.value })} />
        <TextField name="Symptoms" variant="outlined" label="Symptoms" fullWidth multiline rows={4} value={postData.Symptoms} onChange={(e) => setPostData({ ...postData, Symptoms: e.target.value })} />
        <TextField name="contact" variant="outlined" label="contact (mobile number)" fullWidth value={postData.contact } onChange={(e) => setPostData({ ...postData, contact : e.target.value.split(',') })} />
          <h3>covid certificate</h3> <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};


export default Form;
