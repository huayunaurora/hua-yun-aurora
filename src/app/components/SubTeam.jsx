"use client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import ActivityCard from "@/app/components/ActivityCard";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { itemClasses } from "@/app/const/css";

const SubTeam = ({ team, header, activities }) => {
  return (
    <Accordion
      id="teamDetailCollapse"
      variant="splitted"
      selectionMode="multiple"
      defaultExpandedKeys={["1", "5"]}
      itemClasses={itemClasses}
    >
      <AccordionItem
        key="1"
        aria-label={header.teamName}
        title={header.teamName}
      >
        {team.teamNameFull}
      </AccordionItem>
      {team.teamLeaders?.length > 0 && (
        <AccordionItem
          key="2"
          aria-label={header.teamLeadersName}
          title={header.teamLeadersName}
        >
          <div
            key="acc-2"
            className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          >
            {team.teamLeaders.map((name) => (
              <div key={`leader-${name}`}>{name}</div>
            ))}
          </div>
        </AccordionItem>
      )}

      {team.teamMembers?.length > 0 && (
        <AccordionItem
          key="3"
          aria-label={header.teamMemberName}
          title={header.teamMemberName}
        >
          <div
            key="acc-3"
            className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          >
            {team.teamMembers.map((name) => (
              <div key={`member-${name}`}>{name}</div>
            ))}
          </div>
        </AccordionItem>
      )}

      <AccordionItem
        key="4"
        aria-label={header.teamDescriptionName}
        title={header.teamDescriptionName}
      >
        <div key="acc-4" className="grid w-full">
          {team.description && documentToReactComponents(team.description)}
        </div>
      </AccordionItem>
      {activities?.length > 0 && (
        <AccordionItem
          key="5"
          aria-label={header.teamActivityName}
          title={header.teamActivityName}
        >
          <div
            key="acc-5"
            className="grid w-full grid-cols-1 gap-2 md:grid-cols-3"
          >
            {activities.map((act) => (
              <ActivityCard
                key={`card-${act.sys.id}`}
                dateTime={act.fields.dateTime}
                title={act.fields.name}
                picUrl={act.fields.portfolioPicUrl}
                activityId={act.sys.id}
              />
            ))}
          </div>
        </AccordionItem>
      )}
    </Accordion>
  );
};

export default SubTeam;
