//
//  RCTWeChat.h
//  RCTWeChat
//
//  Created by xiaoyan on 15/12/10.
//  Copyright © 2015年 ziyan. All rights reserved.
//

#import <Foundation/Foundation.h>
//#import "RCTBridgeModule.h"
#import <React/RCTBridgeModule.h>
#import "WXApi.h"

@interface RCTWeChat : NSObject <RCTBridgeModule, WXApiDelegate>

+ (instancetype) shareInstance;

- (BOOL) handleOpenURL:(NSURL *)url;

// 发送一个sendReq后，收到微信的回应
//- (void)onResp:(BaseResp *)resp;
// 收到一个来自微信的请求，
// 第三方应用程序处理完后调用sendResp向微信发送结果
//- (void)onReq:(BaseReq *)req;



//文字类型分享  scene枚举  text分享的文本  callback返回
//WXSceneSession  = 0,        /**< 聊天界面    */
//WXSceneTimeline = 1,        /**< 朋友圈      */
//WXSceneFavorite = 2,        /**< 收藏      */
//RCT_EXPORT_METHOD(textShareWeiXinWithScene:(int)scene text:(NSString *)text :(RCTResponseSenderBlock)callback);



//图片分享 scene枚举 thumbImage缩略图 imageFilePath 分享图片 callback返回
//thumbImage imageFilePath 传网址类型的url
//RCT_EXPORT_METHOD(imageShareWeiXinWithScene:(int)scene
//                  thumbImage:(NSString *)thumbImage
//                  :(RCTResponseSenderBlock)callback);


//音乐类型分享 scene 枚举 title 标题 description描述 thumbImage 缩略图的url musicUrl音乐的url musicDataUrl 音乐数据得url callback返回
//RCT_EXPORT_METHOD(musicShareweiXinWithScene:(int)scene
//                  title:(NSString *)title
//                  description:(NSString *)description
//                  thumbImage:(NSString *)thumbImage
//                  musicUrl:(NSString *)musicUrl
//                  musicDataUrl:(NSString *)musicDataUrl
//                  :(RCTResponseSenderBlock)callback)


//视频类型分享 videoUrl 视频url
//RCT_EXPORT_METHOD(videoShareWeiXinWithScene:(int)scene
//                  title:(NSString *)title
//                  description:(NSString *)description
//                  thumbImage:(NSString *)thumbImage
//                  videoUrl:(NSString *)videoUrl
//                  :(RCTResponseSenderBlock)callback)


//网页类型分享 webPageUrl 网址
//RCT_EXPORT_METHOD(webShareWeXinWithScene:(int)scene
//                  title:(NSString *)title
//                  description:(NSString *)description
//                  thumbImage:(NSString *)thumbImage
//                  webPageUrl:(NSString *)webPageUrl
//                  :(RCTResponseSenderBlock)callback)






//*! @brief 错误码
//  WXSuccess           = 0,    /**< 成功    */
//  WXErrCodeCommon     = -1,   /**< 普通错误类型    */
//  WXErrCodeUserCancel = -2,   /**< 用户点击取消并返回    */
//  WXErrCodeSentFail   = -3,   /**< 发送失败    */
//  WXErrCodeAuthDeny   = -4,   /**< 授权失败    */
//  WXErrCodeUnsupport  = -5,   /**< 微信不支持    */

//*! @brief 请求发送场景
//  WXSceneSession  = 0,        /**< 聊天界面    */
//  WXSceneTimeline = 1,        /**< 朋友圈      */
//  WXSceneFavorite = 2,        /**< 收藏       */



@end
