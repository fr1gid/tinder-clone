/*
   Client Page
 */
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Row, Pagination, Tooltip } from "antd";
import ClientDetailsNewNote from "./ClientDetailsNewNote";
import ClientDetailsNewStrategy from "./ClientDetailsNewStrategy";
import ClientDetailsNotesList from "./ClientDetailsNotesList";
import ClientProfile from "./ClientDetailsProfile";
import ClientDetailsTouchPoints from "./ClientDetailsTouchPoints";
import ClientDetailsToolbox from "./ClientDetailsToolbox";
import { Layout, Note2, H3, CardWrap } from "common";
import { RowPagination } from "./styles";
import { getClient } from "utils";
import { iconBack, iconAddCircle } from "media/svg";
import "./styles.css";
import { mockData, notesMock, touchPointsMock } from "utils/mock";

const NOTES_EACH_PAGE = 4;

const ClientDetailsPage = ({ history, location }) => {
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(NOTES_EACH_PAGE);
  const [page, setPage] = useState(1);
  const [isNewNoteModal, toggleNewNoteModal] = useState(false);
  const [isNewStrategyModal, toggleNewStrategyModal] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState(null);

  // Get client from db in future
  const client = getClient(location.pathname);
  const [notes, setNotes] = useState(notesMock);
  const [touchPoints, setPoints] = useState(touchPointsMock);

  const onPageChange = (page) => {
    // Pagination
    setPage(page);
    setMinVal((page - 1) * NOTES_EACH_PAGE);
    setMaxVal(page * NOTES_EACH_PAGE);
  };

  // Props
  const noteProps = {
    height: 200,
    className: "details-note",
  };
  const rowProps = {
    justify: "center",
  };
  const noteListProps = {
    noteProps,
    notesData: notes,
    minVal,
    maxVal,
    authorName: "Blake", // TODO get user
  };
  const paginationProps = {
    current: page,
    defaultCurrent: 1,
    onChange: onPageChange,
    pageSize: NOTES_EACH_PAGE,
    showTotal: (total) => <Note2>Total {notes.length} notes</Note2>,
    total: notes.length,
  };
  const layoutProps = {
    title: `${client.company} - ${client.name}`,
    prefix: <img src={iconBack} alt="" />,
  };

  return (
    <Layout {...layoutProps}>
      <DndProvider backend={HTML5Backend}>
        <Row {...rowProps}>
          <Row {...rowProps}>
            <CardWrap className="details-card details-profile">
              <ClientProfile {...client} />
            </CardWrap>
            <CardWrap height={320} className="details-card details-touch">
              <ClientDetailsTouchPoints
                authorName={"Blake"} // TODO get user
                touchPoints={touchPoints}
              />
            </CardWrap>
            <CardWrap className="details-card details-toolbox">
              <ClientDetailsToolbox
                setSelectedStrategy={setSelectedStrategy}
                handleToggle={() => toggleNewStrategyModal(true)}
              />
            </CardWrap>
          </Row>
          <RowPagination className="details-pagination">
            <H3>
              Notes{" "}
              <Tooltip title="Add Note">
                <img
                  onClick={() => toggleNewNoteModal(true)}
                  style={{ cursor: "pointer" }}
                  src={iconAddCircle}
                  alt="add note"
                />
              </Tooltip>
            </H3>
            <Pagination {...paginationProps} />
          </RowPagination>
          <Row {...rowProps}>
            <ClientDetailsNotesList {...noteListProps} />
          </Row>
        </Row>
        <ClientDetailsNewNote
          isNewNoteModal={isNewNoteModal}
          handleToggle={() => toggleNewNoteModal(false)}
        />
        <ClientDetailsNewStrategy
          client={client}
          selectedStrategy={selectedStrategy}
          isNewStrategyModal={isNewStrategyModal}
          handleToggle={() => toggleNewStrategyModal(false)}
        />
      </DndProvider>
    </Layout>
  );
};

export default ClientDetailsPage;
