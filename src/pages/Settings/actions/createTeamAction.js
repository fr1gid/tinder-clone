import { generateId } from 'utils';

// Action to create a new employee and connections to skills
const createTeamAction = (newData, createTeam, userId, linkUserTeam) => {
  const { teamName, username, password, token } = newData;

  const teamId = generateId();
  createTeam({
    variables: {
      input: {
        id: teamId,
        name: teamName,
        sfKey: `${password}${token}`,
        sfUsername: username
      },
    },
  });
};

export default createTeamAction;