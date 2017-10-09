/**
 * 这个是我的员工列表
 *
 */
import{
    StyleSheet,
    Text,
    Image,
    ScrollView,
    TouchableHighlight,
    TouchableOpacity,
    RefreshControl,
    View,
    ListView,
    Dimensions,
    Alert,
    AsyncStorage
} from 'react-native';
import React,{Component} from 'react';
import MyEmployee from './MyEmployee';
import { UrlgetMyemployee } from '../utils/url';
import Loading from '../loading/loading';
import fetchTool from '../utils/fetchTool';

let { width,height}=Dimensions.get('window');

export  default  class MyEmployeeList extends Component{
    constructor(props){
        super(props);
        this.DS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            dataSource: this.DS.cloneWithRows([]),
            isRefreshing: false,
            visible:false,
            userUUID:"",
            buildrelationdescription:"business",

        };
        //console.log(this.props)
    }

    componentDidMount(){
        AsyncStorage.multiGet(["usertoken","useruuid","usernickname","userPhoto"],(errros,result)=>{
            // console.log(result[0][1]);
            // console.log(result[1][1]);
            // console.log(result[2][1]);
            // console.log(result[3][1]);
            //
            if (result[1][1]!='undefined'){
                this.setState({
                    userUUID:result[1][1]
                })

                let userAccount={
                    userUUID:result[1][1],
                    buildrelationdescription:this.state.buildrelationdescription,
                };

                let options={
                    url:UrlgetMyemployee,
                    body: JSON.stringify(userAccount)
                };

                let  response=fetchTool(options);
                response.then(resp=>{
                    console.log(resp)
                    if (resp.retcode===2000) {
                        //这里获取数组
                        this.setState({
                            dataSource: this.DS.cloneWithRows(resp.lp)
                        });
                    }

                    //停止转圈圈
                    this.setState({
                        visible:false
                    });
                }).catch(err=>{
                    //停止转圈圈
                    this.setState({
                        visible:false
                    });

                });

            }
        })
    }



    shouldComponentUpdate(){
        return true
    }

    componentWillMount(){
        // let userAccount={
        //     userUUID:this.state.userUUID,
        //     buildrelationdescription:this.state.buildrelationdescription,
        // };
        //
        // let options={
        //     url:UrlgetMyemployee,
        //     body: JSON.stringify(userAccount)
        // };
        //
        // let  response=fetchTool(options);
        // response.then(resp=>{
        //     console.log(resp)
        //     if (resp.retcode===2000) {
        //         //这里获取数组
        //         this.setState({
        //             dataSource: this.DS.cloneWithRows(resp.lp)
        //         });
        //     }
        //
        //     //停止转圈圈
        //     this.setState({
        //         visible:false
        //     });
        // }).catch(err=>{
        //     //停止转圈圈
        //     this.setState({
        //         visible:false
        //     });
        //
        // });

    }

    renderRow(row,sectionID){
         return( <MyEmployee  key={row.useraccountid}  row={row} {...this.props}/>);

    }
    _onRefresh() {

    }
    render(){
        return(

            <ListView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        tintColor="#ff0000"
                        title="Loading..."
                        titleColor="#00ff00"
                        colors={['#ff0000', '#00ff00', '#0000ff']}
                        progressBackgroundColor="#ffff00"/>}
                contentContainerStyle={styles.list}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
                initialListSize={21}
                pageSize={10}
                removeClippedSubviews={false}
                onEndReachedThreshold={20}
                scrollRenderAheadDistance={300}
                enableEmptySections={true}/>

        );
    }
}
let styles=StyleSheet.create({
    container: {
        flex:1,
        margin:5,
        justifyContent:'center',
    },
});



















