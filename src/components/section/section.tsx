import React, { FC, PropsWithChildren } from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useStyle from "./section-style";

type SectionProp = {
  title: string;
  className?: string;
  contentClassName?: string;
};

const Section: FC<SectionProp> = (prop: PropsWithChildren<SectionProp>) => {
  const style = useStyle();
  return (
    <Accordion defaultExpanded={true} className={prop.className}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={style.heading}>{prop.title}</Typography>
      </AccordionSummary>
      <AccordionDetails className={prop.contentClassName}>
        {prop.children}
      </AccordionDetails>
    </Accordion>
  );
};

export default Section;
