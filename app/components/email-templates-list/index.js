/*
* EmailTemplatesList
*/
import React from 'react';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './styles';
import EmailTemplateItem from '../email-template-item';

/* eslint-disable react/prefer-stateless-function */
export class EmailTemplatesList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    const { onLoadEmailTplsMore } = this.props;
    onLoadEmailTplsMore();
  }

  // componentDidUpdate() {
  //   const height = this.divElement.clientHeight;
  //   console.log({ height });
  // }

  render() {
    const {
      classes,
      emailTemplatesListHeight,
      emailTemplatesList,
      expandedEmailTplId,
      onExpandEmailTemplate,
      onClickUpdateEmailTplBtn,
      onClickDeleteEmailTplBtn,
    } = this.props;
    const { skip, limit, total } = emailTemplatesList;
    return (
      <div
        ref={divElement => (this.divElement = divElement)}
        id="scrollableDiv"
        className={classes.root}
      >
        {emailTemplatesList.results.length === 0 ? (
          <Typography component="p" className={classes.noResults}>
            No results to display
          </Typography>
        ) : (
          <InfiniteScroll
            dataLength={emailTemplatesList.results.length}
            next={this.loadMore}
            hasMore={skip + limit < total}
            loader={<LinearProgress color="secondary" />}
            endMessage={
              <p className={classes.endMsg}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            scrollableTarget="scrollableDiv"
          >
            {emailTemplatesList.results.map(emailTemplate => (
              <EmailTemplateItem
                key={emailTemplate.emailTplId}
                emailTemplate={emailTemplate}
                expandedEmailTplId={expandedEmailTplId}
                onExpandEmailTemplate={onExpandEmailTemplate}
                onClickDeleteEmailTplBtn={onClickDeleteEmailTplBtn}
                onClickUpdateEmailTplBtn={onClickUpdateEmailTplBtn}
              />
            ))}
          </InfiniteScroll>
        )}
      </div>
    );
  }
}

const withMyStyles = withStyles(styles);

export default compose(withMyStyles)(EmailTemplatesList);
