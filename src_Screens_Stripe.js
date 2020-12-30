import React from 'react';
import {SafeAreaView, View} from 'react-native';
import Header from "../Components/Header";
import colors from "../styles/colors";
import WebView from "react-native-webview";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import {BoldText} from "../Components/styledTexts";
import Loader from "../Components/Loader";

const Stripe = ({navigation}) => {

  changeState = (webViewState) => {
    const regex = /[?&]([^=#]+)=([^&#]*)/g;
    const params = {};
    let match;

    const redirect_url = 'http://3.132.6.110';
    console.log("webview state", webViewState);
    const pathArray = webViewState.url.split('/');
    const protocol = pathArray[0];
    const host = pathArray[2];
    const url = protocol + '//' + host;
    console.log("url",webViewState);
    if(url === redirect_url){

      setTimeout(() =>{
        navigation.navigate('Dashboard');
      },10000);
    }

    // https://connect.stripe.com
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.appColor}}>
      <Header
        leftNavigation={navigation}
        value={`Stripe Connect`}
        backgroundColor={colors.appColor}
        color={colors.white}
      />
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <Query query={GET_USER} pollInterval={500}>
          {({loading, error, data, refetch}) => {


            if (loading) {
              return <Loader loading={loading}/>
            }
            if (error) {
              return <BoldText/>
            }

            if (data) {
              return <WebView
                style={{flex: 1}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                source={{uri: `https://connect.stripe.com/express/oauth/authorize?redirect_uri=http://3.132.6.110/connect-account&client_id=ca_GjVTu62m4mwN91RQJQwB4Ji9ApIb83fj&state=${data.me.id}`}}
                onNavigationStateChange = {changeState}
                // onNavigationStateChange={navState => {
                //   // Keep track of going back navigation within component
                //   this.canGoBack = navState.canGoBack;
                //   console.log("navstate",navState);
                // }}
              />
            }
            return <BoldText/>
          }
          }
        </Query>

      </View>


    </SafeAreaView>
  )
};
const GET_USER = gql`
    query {
        me {
        id
       
        }
    } `;


export default Stripe

