import moment from "moment";
import localization from "moment/locale/tr";
import { Grid, makeStyles, Typography } from "@material-ui/core";

function MyContainer(props) {
  const useStyles = makeStyles({
    root: {
      color: "white",
      flex: 1,
      marginLeft: 5,
      textAlign: "left",
    },
    pos: {
      marginBottom: 12,
      fontSize: 18,
    },
  });

  const classes = useStyles();

  console.log(props.children);

  return (
    <Grid container style={{ margin: 10 }}>
      <Grid item xs={3}>
        <Typography className={classes.pos}>{props.name}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography
          className={classes.pos}
          color="error"
          style={{ textAlign: "center" }}
        >
          :
        </Typography>
      </Grid>
      <Grid item xs={3} style={{ position: "relative" }}>
        <Typography variant="subtitle1" component="p">
          {props.value}
          {props.date &&
            moment(props.date).locale("tr", localization).format("LL")}
          {props.enum && props.enum[props.enumIndex]}
          {props.children}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default MyContainer;
