/**
 * 充值界面
 *
 */
import{
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity,
    Text,
    PixelRatio,
    TextInput,
    Modal,
    TouchableWithoutFeedback,
    AsyncStorage
} from 'react-native';
import React,{Component} from 'react';

import fetchTool from '../utils/fetchTool';
import {UrlalipayOrder} from "../utils/url";
import { NativeModules } from 'react-native';
var Alipay=NativeModules.Alipay;

let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
let ratio = PixelRatio.get();
export default class PageRecharge extends  Component {
    constructor(props) {
        super(props);
        this.state = {
            animationType: 'slide',
            modalVisible: false,
            transparent: true,
            moneyNumber: '请选择',
            flag: '',
            nickName:'',
            IDCard:'',
            userUUID:"",
        };
    }

    componentDidMount() {
        console.log(this.props.navigation.state)
        AsyncStorage.multiGet(["usertoken","useruuid","usernickname","userPhoto"],(errros,result)=>{
            console.log(result[0][1]);
            console.log(result[1][1]);
            console.log(result[2][1]);
            console.log(result[3][1]);
            //
            if (result[1][1]!='undefined'){
                this.setState({
                    userUUID:result[1][1]
                })
            }
            if (result[3][1]!='undefined' && result[3][1]!=null){
                this.setState({
                    defaultPhoto:result[3][1]
                })
            }

        })
    }


    getCategoryType(type){//通过后台的数据获得具体的类型
        if(type=="little")
            return "少儿健康互助";
        if(type=="young")
            return "中青年抗癌计划";
        if(type=="old")
            return "中老年抗癌计划";
        if(type=="yiwai")
            return "综合意外互助";
        if(type=="staff")
            return "员工大病互助";
        if(type=="employee")
            return "员工意外伤害互助";
    }
    setModalVisible(visible) {
        this.setState({
            modalVisible: visible
        });
    }

    checkMoney(moneyNumber) {
        this.setState({
            moneyNumber: moneyNumber,
            flag: moneyNumber,
        })
        this.setModalVisible(!this.state.modalVisible);
    }
    handleIDCardChange(event){
        this.setState({
            IDCard:event.nativeEvent.text
        });
    }
    handleNickNameChange(event){
        this.setState({
            nickName:event.nativeEvent.text
        });
    }
    goChongZhi(){
        // alert("调用支付"+this.state.nickName+"-"+this.state.IDCard+"-"+this.state.moneyNumber+"-")
        let orderParam={
            amount:this.state.moneyNumber,
            userUUID:this.state.userUUID,
            accountUUID:this.state.IDCard,
            userName:this.state.nickName,
            categoryType:this.props.navigation.state.categoryType,
        };
        let options={
            url:UrlalipayOrder,
            body:JSON.stringify(orderParam)
        };
        let response=fetchTool(options);
        response.then(resp=>{
            console.log(resp)
            if (resp.retcode===2000) {
                let oderStr=resp.oderStr; //这个是返回的加密的字符串

                Alipay.signedString(oderStr,(err,data)=>{
                    console.log(err);
                });

            }//if
        }).catch(err=>{
            console.log(err)
        });
    }//goChongZhi

    render() {
        const{params}=this.props.navigation.state;
        console.log(params)
        // let {params}=this.props.navigation.state.EmployeeMsg;
        var modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
        };
        var innerContainerTransparentStyle = this.state.transparent
            ? {backgroundColor: '#fff', padding: 20}
            : null;
        var activeButtonStyle = {
            backgroundColor: '#ddd'
        };

        let backGroudColor = this.props.checked ? this.state.backgroundColor : '#FFFFFF';  //钱的背景颜色  是否被选中
        let backGrounpColor_9 = (this.state.flag === 9) ? '#eac646' : '#FFFFFF';
        let backGrounpColor_30 = (this.state.flag === 30) ? '#eac646' : '#FFFFFF';
        let backGrounpColor_50 = (this.state.flag === 50) ? '#eac646' : '#FFFFFF';
        let backGrounpColor_100 = (this.state.flag === 100) ? '#eac646' : '#FFFFFF';
        let backGrounpColor_150 = (this.state.flag === 150) ? '#eac646' : '#FFFFFF';
        let backGrounpColor_300 = (this.state.flag === 300) ? '#eac646' : '#FFFFFF';
        return (
            <View style={styles.container}>
                {/*这里是填写保障人信息的地方*/}
                <View style={styles.inputsWrap}>
                    <View style={styles.email}>
                        <View style={styles.labelWrap}>
                            <Text style={styles.emailText}>姓 名</Text>
                        </View>
                        <View style={styles.inputWrap}>
                            <Text style={styles.emailText}>{params.EmployeeMsg.username}</Text>
                        </View>
                    </View>
                    <View style={styles.email}>
                        <View style={styles.labelWrap}>
                            <Text style={styles.emailText}>计划</Text>
                        </View>
                        <View style={styles.inputWrap}>
                            <Text style={styles.emailText}>{this.getCategoryType(params.EmployeeMsg.categorytype)}</Text>
                        </View>
                    </View>
                    <View style={styles.email}>
                        <View style={styles.labelWrap}>
                            <Text style={styles.emailText}>充 值</Text>
                        </View>
                        <View style={styles.inputWrap}>
                            <TouchableOpacity onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                            }}>
                                <Text style={{
                                    width: 100,
                                    fontSize: 20,
                                    color: 'black'
                                }}>{this.state.moneyNumber}(元)</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View  style={styles.loginwrap} >
                    <TouchableOpacity style={styles.chongzhiButton} onPress={this.goChongZhi.bind(this)}>
                        <Text style={{color:'#FFFFFF'}}>确认充值</Text>
                    </TouchableOpacity>
                </View>


                {/*这里是模态弹出框*/}

                <Modal
                    animationType={this.state.animationType}
                    transparent={this.state.transparent}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert("Modal has been closed.")
                    }}>
                    <View style={styles.selectPayMoneyWrapper}>
                        <View style={styles.selectPayMoney}>
                            <TouchableOpacity onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                            }}>
                                <Text style={{width: 40}}>取消</Text>
                            </TouchableOpacity>
                            <Text>选择充值金额</Text>
                            <Text style={{width: 40}}></Text>
                        </View>
                        {/*温馨提示*/}
                        <View style={styles.tips}>
                            <Text style={{fontWeight: 'bold', fontSize: 12}}>温馨提示:</Text>
                            <Text style={{fontSize: 12, color: '#949697'}}>建议充值30以上，避免余额不足失去保障</Text>
                        </View>
                        {/*充值金额*/}
                        <View style={styles.itemMoneyS}>
                            <TouchableOpacity onPress={() => {
                                this.checkMoney(9)
                            }} style={[styles.itemMoney, {backgroundColor: backGrounpColor_9,}]}>
                                <View>
                                    <Text>9元</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.checkMoney(30)
                            }} style={[styles.itemMoney, styles.moneySpecial, {backgroundColor: backGrounpColor_30,}]}>
                                <View>
                                    <Text>30元</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.checkMoney(50)
                            }} style={[styles.itemMoney, {backgroundColor: backGrounpColor_50,}]}>
                                <View>
                                    <Text>50元</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemMoneyS}>
                            <TouchableOpacity onPress={() => {
                                this.checkMoney(100)
                            }} style={[styles.itemMoney, {backgroundColor: backGrounpColor_100,}]}>
                                <View>
                                    <Text>100元</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.checkMoney(150)
                            }} style={[styles.itemMoney, styles.moneySpecial, {backgroundColor: backGrounpColor_150,}]}>
                                <View>
                                    <Text>150元</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.checkMoney(300)
                            }} style={[styles.itemMoney, {backgroundColor: backGrounpColor_300,}]}>
                                <View>
                                    <Text>300元</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>

            </View>
        );
    }
}
let styles=StyleSheet.create({
    container:{
        alignItems:'center',
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    moneyFee:{
        width:width*0.9,
        height:150,
        alignItems:'center',
        justifyContent:'center',
        marginTop:10
    },
    rechargeFeeView:{
        flexDirection:'row',
        height:75,

    },
    loginwrap:{                        //  按钮总的view
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width:width,
        marginTop:10,
        height:46,
    },
    loginTouch:{                         //touch的class
        width:width*0.8,
        height:34,
        backgroundColor:'#1296db',
        borderRadius:15,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    smallTip:{
        flexDirection:'row',
        justifyContent:'flex-start',
        paddingTop:10
    },
    TopFontView:{
        flexDirection:'row',
        alignSelf:'flex-start',
        marginTop:5
    },
    TopFont:{
        color:'#707070',
        fontSize:13
    },
    TopFontTitle:{
        color:'#1296db',
        fontSize:20,
    },
    topView:{
        width:width*0.75,
        marginTop:20
    },
    moneyChoicesView:{
        width:width,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
        paddingTop:15
    },
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE',
    },
    inputsWrap: {
        margin: 10,
        backgroundColor: '#fff',
        marginTop: 30
    },
    email: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: 44,
        marginTop: 30
    },
    emailText: {
        fontSize: 16,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        color: '#666666'
    },

    labelWrap: {
        height: 45,
        justifyContent: 'center',
        width: 60
    },

    chongzhiButton:{
        width:width*0.9,
        height:40,
        backgroundColor:'#1296db',
        borderRadius:20,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    loginwrap:{                                             //  按钮总的view
        flexDirection:'row',
        marginTop:100,
        alignItems:'center',
        justifyContent:'center',
        width:width,
        height:46,
    },

    chongzhiButtonView:{
        justifyContent:'center',
        marginTop:50,
    },
    label: {
        fontSize: 16,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        color: '#666666'
    },
    inputWrap: {
        borderBottomColor: '#CCCCCC',
        backgroundColor: '#FFFFFF',
        height: 45,
        justifyContent: 'center',
        borderBottomWidth: 1 / ratio,
    },
    passwordinput: {
        height: 45,
        width: width - 90,
        fontSize: 16,
        paddingLeft: 10,
    },
    selectPayMoneyWrapper: {
        position: 'absolute',

        left: 0,
        bottom: 0,
        height: 0.5 * height,
        backgroundColor: '#fff',
        width: width,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        zIndex: 5
    },
    selectPayMoney: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 40,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1 / ratio,
    },
    tips: {
        flexDirection: 'row',
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    itemMoneyS: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 5,
        marginRight: 5
    },
    itemMoney: {
        backgroundColor: '#EDEEEF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 60,
        flex: 1,
        marginTop: 3
    },
    moneySpecial: {
        marginLeft: 3,
        marginRight: 3
    }
});



















