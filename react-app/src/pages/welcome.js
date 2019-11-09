import React, { Component } from 'react'
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Paper, Grid, Container, Typography, TextField, Button, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { func } from 'prop-types';

const POSTS_QUERY = gql`
  query getPosts($page: Int!, $limit: Int!) {
    getPosts(page: $page, limit: $limit) {
      posts {
        title
        body
      }
      total
    }
  }
`;

const POST_MUTATION = gql`
mutation createPost($input: inputPost!) {
    createPost(input: $input) {
      title
      body
    }
  }
`

const NOTIF = gql`
subscription listenNotification {
    listenNotification {
      title
      message
    }
  }
`;

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: 10,
    },
    control: {
        padding: theme.spacing(2),
    },
}));



function GetNotif() {
    const [open, setOpen] = React.useState(true)
    const { data, loading } = useSubscription(NOTIF);
    const classes = useStyles()

    console.log(loading)

    if (loading) return false
    if (!data.listenNotification) return false;

    const handleClose = () => {
        setOpen(!open)
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{data.listenNotification.message}</span>}
            action={[
                <IconButton
                    key="close"
                    aria-label="close"
                    color="inherit"
                    className={classes.close}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>,
            ]}
        />
    )
}

export function GetPosts() {
    
    const [body, setBody] = React.useState();
    const [title, setTitle] = React.useState();

    const { loading, error, data, refetch } = useQuery(POSTS_QUERY, { variables: { page: 1, limit: 10 } });
    const [createPost, { }] = useMutation(POST_MUTATION)

    
    const classes = useStyles()

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    

    const handleSubmit = (event) => {
        createPost({
            variables: {
                input: {
                    title,
                    body,
                }
            }
        })
        refetch()
    }

    return (
        <Container>

            <GetNotif />

            <Grid container className={classes.root} justify="center" spacing={2}>
                <Grid xs={12} item>
                    <Paper className={classes.paper}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Multiline"
                            multiline
                            rowsMax="1"
                            fullWidth
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Multiline"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={body}
                            onChange={(event) => setBody(event.target.value)}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <Button align="right" onClick={handleSubmit} variant="contained" color="primary" className={classes.button}>
                            Submit
                        </Button>
                    </Paper>

                </Grid>
            </Grid>
            <Grid container className={classes.root} justify="center" spacing={2}>
                {data.getPosts.posts.map(({ title, body }) => (
                    <Grid xs={12} item>
                        <Paper className={classes.paper}>
                            <Typography component="h2" variant="h5">
                                {title}
                            </Typography>
                            <Typography component="p" variant="p">
                                {body}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}