import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            '& input': {
                width: '25ch'
            },
        },

    },
}));


export default useStyles;