interface TitleProps {
  title: string;
}

const styles = {
  fontSize: "2rem",
  fontWeight: "600",
  paddingBottom: "2rem",
};

export default function Title({ title }: TitleProps) {
  return <h2 style={styles}>{title}</h2>;
}
