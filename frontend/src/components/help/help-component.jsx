import React from "react";
import "./help-component.scss";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

function StudentHelp() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <h3>Help With Students</h3>
      <div className="accord">
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Student Search
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              This is where you can edit a student's info or change thier plan
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <strong>Searching for a Student: </strong> Use the search box to
              find a student by name or id. Then click on the student to pull up
              thier information
              <br />
              <strong>Updating student Info: </strong> To edit any info for the
              student, click on the info tab and change the corresponding text
              box and click the update button
              <br />
              <strong>Changing a Student Plan: </strong> To edit a student's
              plan, click on the plan tab. Here you can change the number of
              years you would like to plan for the student. The form will auto
              generate the select boxes from which you can select the classes to
              assign the student. Clicking the update button at the bottom of
              the page will save the progress so far
              <br />
              <strong>
                YOU MUST UPDATE BEFORE CLICKING OFF THE PLAN OTHERWISE IT WILL
                NOT SAVE
              </strong>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Add Student
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              This is where new students are added to the program
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <strong>Step 1:</strong> Select a program to add the student to
              from the drop down select box <br />
              <strong>Step 2:</strong> Fill out the corresponding information
              about the student
              <br />
              <strong>
                If the student id or the email aready are assigned to another
                student an error will show
              </strong>
              <br />
              <strong>Step 3:</strong> Click on the add student button and wait
              for the popup for confirmation.
              <br />
              <strong>Errors: </strong> If an error shows up, fix the
              corresponding field and click the add student button again
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Archived Students
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              This is where students who are no longer active are stored
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <strong>Searching for a Student:</strong> Search for a student by
              name or id in the search box and click on the search button to
              show the information <br />
              <strong>Updating Student Info: </strong> To update any
              information, change the text boxes with the new information and
              then click on the update button at the bottom of the page.
              <br />
              <strong>Reactivating a Student: </strong> To reactivate a student,
              click on the activate button on the bottom of the screen and
              confirm in the popup. Upon succes a popup will alert you.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Lost Students
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              This is where students who have bad student ids are stored
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              This page shows a table of all the students who have invalid
              student ids. To fix these students, copy the student id and go to
              the Student search tab if the student is active or the Archived
              Students tab if the student is inactive and paste the id into the
              search bar. This will then allow you to search for that student
              and fix their CWU_ID there.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

function ClassHelp() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <h3>Help With Classes</h3>
      <div className="accord">
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Class Search
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              This is where you can edit a class's info or change the offered
              quarter
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <strong>Searching for a Class: </strong> Use the search box to
              find a class by name. Then click on the class to pull up thier
              information
              <br />
              <strong>Updating class Info: </strong> To edit any info for the
              class, change the corresponding text on the class info field and
              slider tool for term offered. Once you are done making necessary
              changes, click the update button.
              <br />
              <strong>Enrollment Table: </strong> This table shows you the
              number of enrollement for the selected class with the by term and
              year. Note:- The update functionality on the page has nothing to
              with this table--there is no way you can edit the number of
              enrollement on from here.
              <br />
              <strong>
                YOU MUST UPDATE BEFORE CLICKING OFF THE PLAN OTHERWISE IT WILL
                NOT SAVE
              </strong>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Add Class
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              This is where new classes are added
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <strong>Step 1:</strong> Type the catalog code you would like to
              define the the class you would like add. Place holder is a
              example. <br />
              <strong>Step 2:</strong> Writ the full name of the class as shown
              in the text field as shown in the placeholder.
              <br />
              <strong>Step 3:</strong> Type the credit equivalency for the
              class.
              <br />
              <strong>Step 4:</strong>Select the quarter offered for the class
              you are adding. Review Step1 through Step 4 and Click Add class
              button. Always wait until the confirmation.
              <br />
              <strong>If the class already exists error pops out</strong>
              <strong>Errors: </strong> If an error shows up, fix the
              corresponding field and click the add class button again
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

function MajorHelp() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <h3>Help With Majors and Programs</h3>
      <div className="accord">
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Major Search
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              This is where you can edit a major's info or deactivate them
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <strong>Searching for a Major: </strong> Use the search box to
              find a major by name. Then click on the major to pull up major
              <br />
              <strong>Updating Major Info: </strong> To edit any info for the
              major, click on the name field of the major and change the
              corresponding text box and click the update button
              <br />
              <strong>Deactivate Major: </strong> To deactivate a major, click
              on the deactvate button.
              <br />
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Add Major
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              This is where new majors are added to the program
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <strong>Step 1:</strong> Type the name of the major on the box{" "}
              <br />
              <strong>Step 2:</strong> If sure, that's the major to be added-
              click the add button.
              <br />
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Program Search
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              This is where program can be fond and made necessary update if
              needed.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <strong>Searching for a Program:</strong> Search for a program by
              name in the search box and click on the search button to show the
              information <br />
              <strong>Updating Program Info: </strong> To update any
              information, change the text boxes with the new information and
              then click on the update button at the bottom of the page.
              <br />
              <strong>Add Required Class: </strong> To add a required class in
              to program, search for necessay class on the search bos on the
              page. Click the Add button after the class found in such way
              selected class is added as required class to the program.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Add Program{" "}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              This is where new program can be added
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              This page shows a table of all the students who have invalid
              student ids. To fix these students, copy the student id and go to
              the Student search tab if the student is active or the Archived
              Students tab if the student is inactive and paste the id into the
              search bar. This will then allow you to search for that student
              and fix their CWU_ID there.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export { StudentHelp, ClassHelp, MajorHelp };
