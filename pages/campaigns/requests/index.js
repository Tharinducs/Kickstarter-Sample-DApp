import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Link } from '../../../routes';
import { Button, Table, Grid } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow'

class RequestIndex extends Component{
    static async getInitialProps(props){
        const { address } = props.query;
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const approversCount = await campaign.methods.approversCount().call();

        const requests = await Promise.all(
            Array(requestCount).fill().map((element, index)=>{
                return campaign.methods.requests(index).call()
            })
        );

        console.log(requestCount);
        return { address, requests, requestCount, approversCount };
    }

    renderRow(){
        return this.props.requests.map((request,index) =>{
            return <RequestRow
                key={index}
                id={index}
                request={request}
                address={this.props.address}
                approversCount = {this.props.approversCount}
            ></RequestRow>
        })
    }
    render(){
        return(
            <Layout>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={12}>
                <h3>Requests</h3>
                        </Grid.Column>
                        <Grid.Column width={3}>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary>Add Request</Button>
                    </a>
                </Link>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Amount</Table.HeaderCell>
                            <Table.HeaderCell>Recipient</Table.HeaderCell>
                            <Table.HeaderCell>Approval Count</Table.HeaderCell>
                            <Table.HeaderCell>Approve</Table.HeaderCell>
                            <Table.HeaderCell>Finalize</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.renderRow()
                        }
                    </Table.Body>
                </Table>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
            </Layout>
        );
    }
}

export default RequestIndex;