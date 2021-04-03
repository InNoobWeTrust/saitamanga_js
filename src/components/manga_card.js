import Link from "next/link";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: 160,
  },
  media: {
    height: 170,
  },
});

export default function MangaCard({ cover, title, description }) {
  const classes = useStyles();

  return (
    <>
      <Link href="/manga">
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia className={classes.media} image={cover} title={title} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h4">
                {title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </>
  );
}
