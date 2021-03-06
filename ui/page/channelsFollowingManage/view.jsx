// @flow
import * as PAGES from 'constants/pages';
import React, { useEffect } from 'react';
import Page from 'component/page';
import ClaimList from 'component/claimList';
import Button from 'component/button';

type Props = {
  subscribedChannels: Array<Subscription>,
  location: { search: string },
  history: { push: string => void },
  doFetchRecommendedSubscriptions: () => void,
  suggestedSubscriptions: Array<{ uri: string }>,
};

function ChannelsFollowingManagePage(props: Props) {
  const { subscribedChannels, location, history, doFetchRecommendedSubscriptions, suggestedSubscriptions } = props;
  const hasSubscriptions = !!subscribedChannels.length;
  const channelUris = subscribedChannels.map(({ uri }) => uri);

  const { search } = location;
  const urlParams = new URLSearchParams(search);
  const viewingSuggestedSubs = urlParams.get('view') || !hasSubscriptions;

  function onClick() {
    let url = `/$/${PAGES.CHANNELS_FOLLOWING_MANAGE}`;
    if (!viewingSuggestedSubs) {
      url += '?view=discover';
    }

    history.push(url);
  }

  useEffect(() => {
    doFetchRecommendedSubscriptions();
  }, [doFetchRecommendedSubscriptions]);

  return (
    <Page>
      <ClaimList
        header={viewingSuggestedSubs ? __('Discover New Channels') : __('Channels You Follow')}
        headerAltControls={
          <Button
            button="link"
            label={viewingSuggestedSubs ? hasSubscriptions && __('View Your Channels') : __('Find New Channels')}
            onClick={() => onClick()}
          />
        }
        uris={viewingSuggestedSubs ? suggestedSubscriptions.map(sub => `lbry://${sub.uri}`) : channelUris}
      />
    </Page>
  );
}

export default ChannelsFollowingManagePage;
