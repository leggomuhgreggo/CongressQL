# CongressQL

https://projects.propublica.org/api-docs/congress-api/

I had shit working but then tried to split apart the graphql files and the import logic couldn't handle it.

So I need to either step it back or improve the server rigors -- probably locally because sandbox was laggin

I think there's a good case to be made for methodically mapping the REST API docs to typescript -- might even generate some OpenAPI if Im feeling generous

Next Up: https://www.opensecrets.org/api/admin/index.php?function=user_api_list

---

# API Mapping

## Meta

Maybe something like this?

```graphql
{
  member(id) {
    bills {
      name
      comittee{}
      subjects {}
      votes {}
      statements {}
    }
  }
}
```

Non-cosponsers -- will potentially need cached member list to diff from

some cryptic properties -- rename / add docs

Probably should switch to typescript and get some shit done

## Members

Lists of Members - Splitting into house and senate; type MemberSummary

Get a Specific Member - I feel like this is only ever going to be done programmatically; type MemeberDetails

- do we need to list all the old congresses? might split into separate query

Get New Members - low priority
Get Members Leaving Office - low priority

Get Current Members by State/District - seems tight

Get a Specific Member’s Vote Positions - should also be resolvable by memeber detail
Get Bills Cosponsored by a Specific Member - should also be resolvable by memeber detail

Compare Two Members Vote Positions - low priority
Compare Two Members’ Bill Sponsorships - low priority

## Members Expenses

Get Quarterly Office Expenses by a Specific House Member
Get Quarterly Office Expenses by Category for a Specific House Member
Get Quarterly Office Expenses for a Specified Category

Privately Funded Travel

Get Recent Privately Funded Trips
Get Recent Privately Funded Trips by a Specific House Member

## Bills

Search Bills - "searchLegislation" type Legislation
Get Recent Bills - type Legislation

Get Recent Bills by a Specific Member
Get Recent Bills by a Specific Subject - how do we know the subject?
Get Upcoming Bills
Get a Specific Bill

(Relationships?)
Get Amendments for a Specific Bill
Get Subjects for a Specific Bill
Get Related Bills for a Specific Bill
Get a Specific Bill Subject
Get Cosponsors for a Specific Bill
ADD get non-Cosponsors

## Votes

Note About House Votes
Get Recent Votes
Get a Specific Roll Call Vote - relate to bill
Get Votes by Type
Get Votes by Date
Get Senate Nomination Votes
Personal Explanations
Get Recent Personal Explanations
Get Recent Personal Explanation Votes
Get Recent Personal Explanation Votes by Category
Get Recent Personal Explanations by a Specific Member
Get Recent Personal Explanation Votes by a Specific Member
Get Recent Personal Explanation Votes by a Specific Member by Category

## Statements

Get Recent Congressional Statements
Get Congressional Statements by Date
Get Congressional Statements by Search Term
Get Statement Subjects
Get Congressional Statements by Subject
Get Congressional Statements by Member
Get Congressional Statements by Bill
Congressional Committee Statements
Get Recent Congressional Committee Statements
Get Congressional Committee Statements by Date
Get Congressional Committee Statements by Committee
Get Congressional Committee Statements by Search Term

## Committees

Lists of Committees
Get a Specific Committee
Get Recent Committee Hearings
Get Hearings for a Specific Committee
Get a Specific Subcommittee
Official Communications
Get Recent Official Communications
Get Recent Official Communications by Category
Get Recent Official Communications by Date
Get Recent Official Communications by Chamber

## Nominations

Get Recent Nominations by Category
Get a Specific Nomination
Get Nominees by State
Floor Actions
Get Recent House and Senate Floor Actions
Get House and Senate Floor Actions by Date

## Lobbying

Get Recent Lobbying Representation filings
Search Lobbying Representation filings
Get a Specific Lobbying Representation filing
Other Responses
Get State Party Counts
