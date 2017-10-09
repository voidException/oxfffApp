/**
 * 使用红包界面
 *
 */
import {
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity,
    Text,
    PixelRatio,
    TextInput,
    Modal,
    TouchableWithoutFeedback,
    Image,
    AsyncStorage
} from 'react-native';
import React, {Component} from 'react';
import CheckBox from './CheckBox';
import {UrluseMyRedMoney} from "../utils/url";
import fetchTool from "../utils/fetchTool";

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let ratio = PixelRatio.get();
export default class PageUseRedMoney extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: 0,
            animationType: 'slide',
            modalVisible: false,
            transparent: true,
            moneyNumber: '请选择',
            flag: '',
            nickName:'',
            IDCard:'',
            type:'请选择互助计划',
            userUUID:""
        };
    }

    componentDidMount() {

        AsyncStorage.multiGet(["usertoken","useruuid","usernickname","userPhoto"],(errros,result)=>{

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

    getCategoryType(type) {//通过后台的数据获得具体的类型
        if (type == "little")
            return "少儿健康互助";
        if (type == "young")
            return "中青年抗癌计划";
        if (type == "old")
            return "中老年抗癌计划";
        if (type == "yiwai")
            return "综合意外互助";
        if (type == "staff")
            return "员工大病互助";
        if (type == "employee")
            return "员工意外伤害互助";
        else
            return "请选择互助计划"
    }

    setModalVisible(visible) {
        this.setState({
            modalVisible: visible
        });
    }

    checkMoney(type) {
        this.setState({
            type: type,
            flag: type,
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
        const {params}=this.props.navigation.state;
        let UseRedMoneyParam={
            useruuid:this.state.userUUID,
            redmoneyid:params.RedMoney.redmoneyid,
            redMoney:params.RedMoney,
            username:this.state.nickName,
            useridentity:this.state.IDCard,
            categorytype:this.state.type,
        };
        let options={
            url:UrluseMyRedMoney,
            body:JSON.stringify(UseRedMoneyParam)
        };
        let response=fetchTool(options);
        response.then(resp=>{
            console.log(resp)

            if(resp.retcode==2000){
                alert("使用成功")
            }else{
                alert("出现问题")
            }
        });

    }
    render() {
        var modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
        };
        var innerContainerTransparentStyle = this.state.transparent
            ? {backgroundColor: '#fff', padding: 20}
            : null;
        var activeButtonStyle = {
            backgroundColor: '#ddd'
        };
        // little young old yiwai staff  员工大病 employee 员工意外
        let backGrounpColor_little = (this.state.flag === 'little') ? '#1296db' : '#FFFFFF';
        let backGrounpColor_young = (this.state.flag === 'young') ? '#1296db' : '#FFFFFF';
        let backGrounpColor_old = (this.state.flag === 'old') ? '#1296db' : '#FFFFFF';
        let backGrounpColor_yiwai = (this.state.flag === 'yiwai') ? '#1296db' : '#FFFFFF';
        let backGrounpColor_staff = (this.state.flag === 'staff') ? '#1296db' : '#FFFFFF';
        let backGrounpColor_employee = (this.state.flag === 'employee') ? '#1296db' : '#FFFFFF';
        return (
            <View style={styles.container}>
                {/*这里是填写保障人信息的地方*/}
                <View style={styles.inputsWrap}>
                    <View style={styles.email}>
                        <View style={styles.labelWrap}>
                            <Text style={styles.emailText}>姓 名</Text>
                        </View>
                        <View style={styles.inputWrap}>
                            <TextInput
                                style={styles.passwordinput}
                                placeholder='输入被保障人姓名'
                                keyboardType='email-address'
                                maxLength={30}
                                ref='refemail'
                                autoCapitalize='none'
                                clearButtonMode='always'
                                clearTextOnFocus={false}
                                keyboardAppearance='dark'
                                autoCorrect={false}
                                onChange={this.handleNickNameChange.bind(this)}
                            />
                        </View>
                    </View>
                    <View style={styles.email}>
                        <View style={styles.labelWrap}>
                            <Text style={styles.emailText}>身份证</Text>
                        </View>
                        <View style={styles.inputWrap}>
                            <TextInput
                                style={styles.passwordinput}
                                placeholder='被保障人的身份证号'
                                keyboardType='email-address'
                                maxLength={30}
                                ref='refemail'
                                autoCapitalize='none'
                                clearButtonMode='always'
                                clearTextOnFocus={false}
                                keyboardAppearance='dark'
                                autoCorrect={false}
                                onChange={this.handleIDCardChange.bind(this)}
                            />
                        </View>
                    </View>
                    <View style={styles.email}>
                        <View style={styles.labelWrap}>
                            <Text style={styles.emailText}>计  划</Text>
                        </View>
                        <View style={styles.inputWrap}>
                            <TouchableOpacity onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                            }}>
                                <Text style={{
                                    width: 200,
                                    fontSize: 15,
                                    color: 'black'
                                }}>{this.getCategoryType(this.state.flag)}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View  style={styles.loginwrap} >
                    <TouchableOpacity style={styles.chongzhiButton} onPress={this.goChongZhi.bind(this)}>
                        <Text style={{color:'#FFFFFF'}}>确认使用</Text>
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
                            <Text>选择互助计划</Text>
                            <Text style={{width: 40}}></Text>
                        </View>
                        {/*温馨提示*/}
                        <View style={styles.tips}>
                            <Text style={{fontWeight: 'bold', fontSize: 12}}>温馨提示:</Text>
                            <Text style={{fontSize: 12, color: '#949697'}}>请仔细核对姓名和身份证号，红包使用后将失效</Text>
                        </View>
                        {/*充值金额*/}
                        <View style={styles.itemMoneyS}>
                            <View>
                                <TouchableOpacity onPress={() => {
                                    this.checkMoney('little')
                                }} style={[styles.itemMoney, {backgroundColor: backGrounpColor_little,}]}>
                                    <View>
                                        <Text>青少年互助计划</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => {
                                    this.checkMoney('young')
                                }} style={[styles.itemMoney, {backgroundColor: backGrounpColor_young,}]}>
                                    <View>
                                        <Text>中青年互助计划</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => {
                                    this.checkMoney('old')
                                }} style={[styles.itemMoney, {backgroundColor: backGrounpColor_old,}]}>
                                    <View>
                                        <Text>中老年互助计划</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => {
                                    this.checkMoney('yiwai')
                                }} style={[styles.itemMoney, {backgroundColor: backGrounpColor_yiwai,}]}>
                                    <View>
                                        <Text>综合意外互助计划</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => {
                                    this.checkMoney('staff')
                                }} style={[styles.itemMoney, {backgroundColor: backGrounpColor_staff,}]}>
                                    <View>
                                        <Text>企业员工大病互助计划</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => {
                                    this.checkMoney('employee')
                                }} style={[styles.itemMoney, {backgroundColor: backGrounpColor_employee,}]}>
                                    <View>
                                        <Text>企业员工意外互助计划</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </Modal>

            </View>
        );
    }
}

let styles = StyleSheet.create({
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
        height:36,
        backgroundColor:'#1296db',
        borderRadius:20,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:8
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5
    },
    itemMoney: {
        backgroundColor: '#a1a1a1',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: width-60,
        height: 30,
        // flex: 1,
        marginTop: 1,
        borderRadius:15
    },
    moneySpecial: {
        marginLeft: 3,
        marginRight: 3
    }

});



















