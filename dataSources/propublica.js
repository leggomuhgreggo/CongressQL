const { RESTDataSource } = require("apollo-datasource-rest");
const camelcaseKeys = require("camelcase-keys");

const CONGRESS_API_URL = `https://api.propublica.org/congress/v1/`;
const AUTH_HEADER_NAME = "X-API-Key";

// Just paths no default values or other business logic
const paths = {
  congress: (chamber, session) => `${session}/${chamber}/members.json`,
  member: (id) => `members/${id}.json`,
  memberVotes: (id, offset) => `members/${id}/votes.json?offset=${offset}`
};

class CongressAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = CONGRESS_API_URL;
  }

  // sets the HTTP request header for "X-API-Key" with ProPublica API key
  willSendRequest(request) {
    request.headers.set(AUTH_HEADER_NAME, process.env.PROPUBLICA_KEY);
  }

  // camelcase the keys
  async didReceiveResponse(response, _request) {
    const responseBody = await super.didReceiveResponse(response, _request);
    return camelcaseKeys(responseBody, { deep: true });
  }

  async fetchCongress(chamber, session) {
    const { results } = await this.get(paths.congress(chamber, session));
    return results;
  }

  async fetchMember(memberId) {
    const { results } = await this.get(paths.member(memberId));
    return results;
  }
  async fetchMemberVotes(memberId, offset) {
    const { results } = await this.get(paths.memberVotes(memberId, offset));
    return results;
  }
}

module.exports = CongressAPI;
