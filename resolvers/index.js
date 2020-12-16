const CHAMBER = {
  HOUSE: "HOUSE",
  SENATE: "SENATE"
};

const CURRENT_SESSION = 116;

const resolvers = {
  Query: {
    getHouseMembers: async (parent, args, { dataSources }) => {
      const { session = CURRENT_SESSION } = args;
      const { CongressAPI } = dataSources;

      const response = await CongressAPI.fetchCongress(CHAMBER.HOUSE, session);
      return response;
    },
    getSenateMembers: async (parent, args, { dataSources }) => {
      const { session = CURRENT_SESSION } = args;
      const { CongressAPI } = dataSources;

      const response = await CongressAPI.fetchCongress(CHAMBER.SENATE, session);
      return response;
    },

    memberById: async (_, args, { dataSources }) => {
      const { id } = args;
      const { CongressAPI } = dataSources;

      const response = await CongressAPI.fetchMember(id);
      return response;
    }
  }
};

module.exports = resolvers;
