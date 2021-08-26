/*
  Insights Page 
*/
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// graphql imports
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { listStrategys } from 'graphql/queries';

// ant design imports
import { Row, Col, Tooltip } from 'antd';
import { FolderOutlined } from '@ant-design/icons';

// local components
import InsightsOverallScore from './InsightsOverallScore';
import InsightsMood from './InsightsMood';
import InsightsQuarter from './InsightsQuarter';
import InsightsStrategy from './InsightsStrategy';
import Layout from 'pages/Layout';
import { Client, ArchiveModal } from 'pages/sharedComponents';
import {
  CardWrap,
  CardContainer,
  Flex,
  SubH2,
  Loading,
  SpaceBetween,
  SubH1,
} from 'common';

// local helpers
import { clientNames, findMinMaxClients } from 'utils';
import { PAGE_TITLE } from '../constants';
import { iconSmile, iconSmileDown } from 'media/svg';
import { BadgeStyled } from 'common/components/styles';
import { StyledSmileIcon } from './styles';
import './styles.css';
import useCurrentUser from '../../../customHooks/useCurrentUser';

const InsightsPage = () => {
  const userData = useCurrentUser();
  const { clients } = userData;
  const history = useHistory();
  const [isArchiveModal, toggleArchiveModal] = useState(false);

  const { loading: loadingWin, data: strategyWinData = {} } = useQuery(
    gql(listStrategys),
    {
      variables: {
        filter: {
          status: {
            eq: 'win',
          },
        },
      },
    }
  );

  const { loading: loadingArchive, data: strategyArchive = {} } = useQuery(
    gql(listStrategys),
    {
      variables: {
        filter: {
          status: {
            ne: 'assigned',
          },
        },
      },
    }
  );

  const { loading: loadingAssigned, data: assignedStrategies = {} } = useQuery(
    gql(listStrategys),
    {
      variables: {
        filter: {
          status: {
            eq: 'assigned',
          },
        },
      },
    }
  );

  if (loadingWin || loadingAssigned || loadingArchive) {
    return (
      <Layout>
        <div style={{ marginTop: 200 }}>
          <Loading />
        </div>
      </Layout>
    );
  }

  // get the Top and Bottom Client from formula in utils
  const [clientLowestScore, clientHighestScore] = findMinMaxClients(
    clients?.items
  );
  console.log({clientHighestScore});
  const layoutProps = {
    title: PAGE_TITLE,
  };

  const handleCardClick = (clientId) => {
    history.push(`clients/${clientId}`);
  };

  const renderCardHeader = (backgroundColor, icon, title) => {
    return (
      <Flex>
        <StyledSmileIcon style={{ backgroundColor }}>
          <img src={icon}
            alt={`icon ${title}`} />
        </StyledSmileIcon>
        <SubH2>{title}</SubH2>
      </Flex>
    );
  };

  const HigherScoreHeader = renderCardHeader(
    '#20CDAE',
    iconSmile,
    'Client with Highest Score'
  );
  const LowestScoreHeader = renderCardHeader(
    '#FD6A65',
    iconSmileDown,
    'Client with Lowest Score'
  );

  const insightOverallScoreProps = {
    overallData: clients?.items,
    totalClients: clients?.items.length,
  };
  const insightsStrategyProps = {
    assignedStrategies: assignedStrategies.listStrategys,
    strategyWinData: strategyWinData.listStrategys,
  };

  return (
    <Layout {...layoutProps}>
      <Row justify="center">
        <CardWrap
          height={478}
          className="insights-overall">
          <InsightsOverallScore {...insightOverallScoreProps} />
        </CardWrap>
        <div style={{ marginTop: 5 }}>
          {HigherScoreHeader}
          <Client
            client={clientHighestScore}
            onNameClick={handleCardClick} />
        </div>
        <div style={{ marginTop: 5 }}>
          {LowestScoreHeader}
          <Client
            client={clientLowestScore}
            onNameClick={handleCardClick} />
        </div>
        <CardContainer
          height={440}
          width={410}
          className="strategy-metrics">
          <InsightsStrategy {...insightsStrategyProps} />
        </CardContainer>
        <CardContainer
          height={440}
          width={275}
          className="insights-moods">
          <InsightsMood clients={clientNames} />
        </CardContainer>
        <Col>
          <CardContainer
            height={320}
            width={390}
            className="quarter-moods">
            <InsightsQuarter />
          </CardContainer>
          <CardContainer
            height={95}
            width={390}
            className="insights-moods">
            <SpaceBetween>
              <SubH1>
                Overall Client Wins:{' '}
                {strategyWinData.listStrategys?.items.length}
              </SubH1>
              <div style={{ float: 'right' }}>
                <BadgeStyled
                  style={{
                    height: 32,
                    width: 32,
                    backgroundColor: '#ebebeb',
                    cursor: 'pointer',
                  }}
                  onClick={() => toggleArchiveModal(true)}
                >
                  <Tooltip title="Archive">
                    <FolderOutlined alt="Archive Icon" />
                  </Tooltip>
                </BadgeStyled>
              </div>
            </SpaceBetween>
          </CardContainer>
        </Col>
        <ArchiveModal
          handleToggle={toggleArchiveModal}
          isArchiveModal={isArchiveModal}
          data={strategyArchive.listStrategys}
          loading={loadingArchive}
        />
      </Row>
    </Layout>
  );
};

export default InsightsPage;
