import React, {Component} from "react";
import fetch from 'isomorphic-fetch';
import {withAuth} from '@okta/okta-react';

export default withAuth(class ContactHistory extends Component {
  state = {
    contact: this.props.contact || {},
    history: [],
  };

  async componentWillReceiveProps(newProps){
    try {
      const response = await fetch(`http://localhost:3000/api/contacts/${newProps.contact.id}/history`, {
        headers: {
          Authorization: 'Bearer ' + await this.props.auth.getAccessToken()
        }
      });
      const data = await response.json();

      this.setState({ history: data });
    } catch (err) {
      // handle error as needed
    }
  }

  render() {
    if (!this.state.history) return <div>Loading...</div>;
    return (
        <div className="table-responsive">
          <table className="table table-bordered u-table--v2">
            <thead className="text-uppercase g-letter-spacing-1">
            <tr>
              <th className="g-font-weight-300 g-color-black g-min-width-200">Message</th>
              <th className="g-font-weight-300 g-color-black">Status</th>
              <th className="g-font-weight-300 g-color-black">Date</th>
            </tr>
            </thead>

            <tbody>
            <tr>
              <td className="align-middle">
                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus asperiores aut consequatur debitis dignissimos eos ex facilis fugiat iure nemo numquam officia pariatur, quisquam saepe sunt vel veniam vitae? Ipsum.</span>
              </td>
              <td className="align-middle">
                        <span className="u-label g-bg-primary g-rounded-50 g-py-5 g-min-width-90">
                          <i className="fa fa-check g-mr-5"></i>
                          Received
                        </span>
              </td>
              <td className="align-middle text-nowrap">
                <span className="d-block g-mb-5"><i className="icon-calendar g-mr-5"></i> July 16, 2017</span>
                <span className="d-block g-mb-5"><i className="icon-clock g-mr-5"></i> 11:30</span>
              </td>
            </tr>

            <tr>
              <td className="align-middle">
                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda beatae cupiditate eum fuga fugiat itaque nihil provident quam quidem voluptate. Accusantium at culpa in quod? Enim fugiat iste quia veritatis.</span>
              </td>

              <td className="align-middle">
                        <span className="u-label g-bg-red g-rounded-50 g-py-5 g-min-width-90">
                          <i className="fa fa-times g-mr-5"></i>
                          Failed
                        </span>
              </td>
              <td className="align-middle text-nowrap">
                <span className="d-block g-mb-5"><i className="icon-calendar g-mr-5"></i> July 16, 2017</span>
                <span className="d-block g-mb-5"><i className="icon-clock g-mr-5"></i> 14:00</span>
              </td>
            </tr>

            <tr>
              <td className="align-middle">
                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci dolorum eius ipsam iste, molestias obcaecati perspiciatis quae soluta tenetur unde ut voluptatem! Aliquam eligendi error est fuga hic odit, unde!</span>
              </td>

              <td className="align-middle">
                        <span className="u-label g-bg-orange g-rounded-50 g-py-5 g-min-width-90">
                           <i className="fa fa-info g-mr-5"></i>
                          Sent
                        </span>
              </td>
              <td className="align-middle text-nowrap">
                <span className="d-block g-mb-5"><i className="icon-calendar g-mr-5"></i> July 17, 2017</span>
                <span className="d-block g-mb-5"><i className="icon-clock g-mr-5"></i> 11:30</span>
              </td>
            </tr>

            <tr>
              <td className="align-middle">
                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus asperiores aut consequatur debitis dignissimos eos ex facilis fugiat iure nemo numquam officia pariatur, quisquam saepe sunt vel veniam vitae? Ipsum.</span>
              </td>
              <td className="align-middle">
                        <span className="u-label g-bg-primary g-rounded-50 g-py-5 g-min-width-90">
                          <i className="fa fa-check g-mr-5"></i>
                          Received
                        </span>
              </td>
              <td className="align-middle text-nowrap">
                <span className="d-block g-mb-5"><i className="icon-calendar g-mr-5"></i> July 17, 2017</span>
                <span className="d-block g-mb-5"><i className="icon-clock g-mr-5"></i> 14:00</span>
              </td>
            </tr>

            <tr>
              <td className="align-middle">
                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus asperiores aut consequatur debitis dignissimos eos ex facilis fugiat iure nemo numquam officia pariatur, quisquam saepe sunt vel veniam vitae? Ipsum.</span>
              </td>
              <td className="align-middle">
                        <span className="u-label g-bg-primary g-rounded-50 g-py-5 g-min-width-90">
                          <i className="fa fa-check g-mr-5"></i>
                          Received
                        </span>
              </td>
              <td className="align-middle text-nowrap">
                <span className="d-block g-mb-5"><i className="icon-calendar g-mr-5"></i> July 18, 2017</span>
                <span className="d-block g-mb-5"><i className="icon-clock g-mr-5"></i> 11:30</span>
              </td>
            </tr>

            <tr>
              <td className="align-middle">
                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus asperiores aut consequatur debitis dignissimos eos ex facilis fugiat iure nemo numquam officia pariatur, quisquam saepe sunt vel veniam vitae? Ipsum.</span>
              </td>
              <td className="align-middle">
                        <span className="u-label g-bg-red g-rounded-50 g-py-5 g-min-width-90">
                          <i className="fa fa-times g-mr-5"></i>
                          Failed
                        </span>
              </td>
              <td className="align-middle text-nowrap">
                <span className="d-block g-mb-5"><i className="icon-calendar g-mr-5"></i> July 18, 2017</span>
                <span className="d-block g-mb-5"><i className="icon-clock g-mr-5"></i> 14:00</span>
              </td>
            </tr>

            <tr>
              <td className="align-middle">
                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus asperiores aut consequatur debitis dignissimos eos ex facilis fugiat iure nemo numquam officia pariatur, quisquam saepe sunt vel veniam vitae? Ipsum.</span>
              </td>
              <td className="align-middle">
                        <span className="u-label g-bg-primary g-rounded-50 g-py-5 g-min-width-90">
                          <i className="fa fa-check g-mr-5"></i>
                          Received
                        </span>
              </td>
              <td className="align-middle text-nowrap">
                <span className="d-block g-mb-5"><i className="icon-calendar g-mr-5"></i> July 19, 2017</span>
                <span className="d-block g-mb-5"><i className="icon-clock g-mr-5"></i> 11:30</span>
              </td>
            </tr>

            <tr>
              <td className="align-middle">
                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci dolorum eius ipsam iste, molestias obcaecati perspiciatis quae soluta tenetur unde ut voluptatem! Aliquam eligendi error est fuga hic odit, unde!</span>
              </td>

              <td className="align-middle">
                        <span className="u-label g-bg-orange g-rounded-50 g-py-5 g-min-width-90">
                           <i className="fa fa-info g-mr-5"></i>
                          Sent
                        </span>
              </td>
              <td className="align-middle text-nowrap">
                <span className="d-block g-mb-5"><i className="icon-calendar g-mr-5"></i> July 19, 2017</span>
                <span className="d-block g-mb-5"><i className="icon-clock g-mr-5"></i> 14:00</span>
              </td>
            </tr>

            </tbody>
          </table>

          <hr className="g-brd-gray-light-v4 g-my-20" />

          <div className='text-center g-mb-20'>
            <a className='text-muted' href="#!" >Show more <i className="icon-arrow-down g-mr-5"></i></a>
          </div>

        </div>
    )
  };
});