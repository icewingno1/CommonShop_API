/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80037
 Source Host           : localhost:3306
 Source Schema         : commonshopapi

 Target Server Type    : MySQL
 Target Server Version : 80037
 File Encoding         : 65001

 Date: 19/06/2024 15:36:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for address_info
-- ----------------------------
DROP TABLE IF EXISTS `address_info`;
CREATE TABLE `address_info`  (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '' COMMENT '收货人姓名',
  `user_phone` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '' COMMENT '收货人手机号',
  `province_name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '' COMMENT '省',
  `city_name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '' COMMENT '城',
  `region_name` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '' COMMENT '区',
  `detail_address` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '' COMMENT '收件详细地址(街道/楼宇/单元)',
  `user_id` int NOT NULL COMMENT '外键关联用户表',
  `default_flag` tinyint NOT NULL DEFAULT 0 COMMENT '1为默认地址',
  PRIMARY KEY (`address_id`) USING BTREE,
  INDEX `关联用户表`(`user_id` ASC) USING BTREE,
  CONSTRAINT `用户表外键` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = '订单收货地址关联表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of address_info
-- ----------------------------
INSERT INTO `address_info` VALUES (1, '钟某', '13535989825', '广东', '广州', '海珠区', '仲恺', 1, 1);
INSERT INTO `address_info` VALUES (2, '钟XX', '13535989824', '广东', '广州', '天河', '珠江新城', 1, 0);
INSERT INTO `address_info` VALUES (3, '陈XX', '13535989824', '广东', '广州', '天河', '珠江新城', 1, 0);
INSERT INTO `address_info` VALUES (4, '张XX', '13535989824', '广东', '广州', '天河', '珠江新城', 1, 0);
INSERT INTO `address_info` VALUES (6, '肥虎', '13511111111', '四川省', '泸州市', '江阳区', 'meiyou ', 1, 0);

-- ----------------------------
-- Table structure for cart_item
-- ----------------------------
DROP TABLE IF EXISTS `cart_item`;
CREATE TABLE `cart_item`  (
  `cart_item_id` bigint NOT NULL AUTO_INCREMENT COMMENT '购物项主键id',
  `user_id` int NOT NULL COMMENT '用户主键id',
  `goods_id` bigint UNSIGNED NOT NULL DEFAULT 0 COMMENT '关联商品id',
  `goods_count` int NOT NULL DEFAULT 1 COMMENT '数量',
  `is_deleted` tinyint NOT NULL DEFAULT 0 COMMENT '删除标识字段(0-未删除 1-已删除)',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最新修改时间',
  PRIMARY KEY (`cart_item_id`) USING BTREE,
  INDEX `userid`(`user_id` ASC) USING BTREE,
  INDEX `goodsid`(`goods_id` ASC) USING BTREE,
  CONSTRAINT `商品ID外键` FOREIGN KEY (`goods_id`) REFERENCES `goods_info` (`goods_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `用户外键` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cart_item
-- ----------------------------
INSERT INTO `cart_item` VALUES (5, 1, 1, 1, 1, '2024-05-27 01:36:02', '2024-05-27 01:36:02');
INSERT INTO `cart_item` VALUES (7, 1, 2, 4, 1, '2024-06-06 14:43:24', '2024-06-06 10:06:59');
INSERT INTO `cart_item` VALUES (8, 1, 3, 3, 1, '2024-06-06 17:41:39', '2024-06-06 17:41:39');
INSERT INTO `cart_item` VALUES (10, 1, 2, 4, 1, '2024-06-06 14:43:24', '2024-06-06 10:06:59');
INSERT INTO `cart_item` VALUES (11, 1, 1, 1, 1, '2024-06-11 06:16:31', '2024-06-11 06:16:31');
INSERT INTO `cart_item` VALUES (12, 1, 1, 1, 1, '2024-06-12 02:33:25', '2024-06-12 02:33:25');
INSERT INTO `cart_item` VALUES (13, 1, 2, 1, 0, '2024-06-13 01:00:20', '2024-06-13 01:00:20');

-- ----------------------------
-- Table structure for goods_category
-- ----------------------------
DROP TABLE IF EXISTS `goods_category`;
CREATE TABLE `goods_category`  (
  `category_id` bigint NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `category_level` tinyint NOT NULL DEFAULT 0 COMMENT '分类级别(1-一级分类 2-二级分类 3-三级分类)',
  `parent_id` bigint NOT NULL DEFAULT 0 COMMENT '父分类id',
  `category_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '' COMMENT '分类名称',
  `category_rank` int NOT NULL DEFAULT 0 COMMENT '排序值(字段越大越靠前)',
  `is_deleted` tinyint NOT NULL DEFAULT 0 COMMENT '删除标识字段(0-未删除 1-已删除)',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_user` int NOT NULL DEFAULT 0 COMMENT '创建者id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  `update_user` int NULL DEFAULT 0 COMMENT '修改者id',
  `category_img` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '图片',
  PRIMARY KEY (`category_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2001 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of goods_category
-- ----------------------------
INSERT INTO `goods_category` VALUES (1, 1, 0, '手机', 0, 0, '2024-05-26 16:44:57', 0, '2024-05-26 16:44:57', 0, NULL);
INSERT INTO `goods_category` VALUES (2, 1, 0, '平板', 0, 0, '2024-05-26 16:45:25', 0, '2024-05-26 16:45:25', 0, NULL);
INSERT INTO `goods_category` VALUES (1001, 2, 1, '小米手机', 0, 0, '2024-05-26 16:45:52', 0, '2024-05-26 16:45:52', 0, '/resource/image/goods1.webp');
INSERT INTO `goods_category` VALUES (1002, 2, 1, '华为手机', 0, 0, '2024-05-26 16:46:11', 0, '2024-05-26 16:46:11', 0, '/resource/image/goods2.webp');
INSERT INTO `goods_category` VALUES (2001, 2, 2, '安卓平板', 0, 0, '2024-05-26 16:46:28', 0, '2024-05-26 16:46:28', 0, '/resource/image/goods3.webp');

-- ----------------------------
-- Table structure for goods_info
-- ----------------------------
DROP TABLE IF EXISTS `goods_info`;
CREATE TABLE `goods_info`  (
  `goods_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品表主键id',
  `goods_name` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '' COMMENT '商品名',
  `goods_intro` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '' COMMENT '商品简介',
  `category_id` bigint NOT NULL DEFAULT 0 COMMENT '关联分类id',
  `goods_cover_img` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '' COMMENT '商品主图',
  `goods_carousel` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '' COMMENT '商品轮播图',
  `goods_detail_content` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '商品详情',
  `original_price` int NOT NULL DEFAULT 1 COMMENT '商品价格',
  `selling_price` int NOT NULL DEFAULT 1 COMMENT '商品实际售价',
  `stock_num` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '商品库存数量',
  `tag` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '' COMMENT '商品标签',
  `goods_sell_status` tinyint NOT NULL DEFAULT 0 COMMENT '商品上架状态 1-下架 0-上架',
  `create_user` int NOT NULL DEFAULT 0 COMMENT '添加者主键id',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '商品添加时间',
  `update_user` int NOT NULL DEFAULT 0 COMMENT '修改者主键id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '商品修改时间',
  PRIMARY KEY (`goods_id`) USING BTREE,
  INDEX `cate`(`category_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of goods_info
-- ----------------------------
INSERT INTO `goods_info` VALUES (1, 'Xiaomi 14 Ultra', '徕卡光学 Summilux 镜头，第三代骁龙®8移动平台', 1001, '/resource/image/goods1.webp', '/resource/image/goods1_swiper1.png', 'yyy', 6999, 6999, 10, '', 0, 0, '2024-05-26 15:19:14', 0, '2024-05-26 15:19:14');
INSERT INTO `goods_info` VALUES (2, 'HUAWEI Pura 70 Pro', '超聚光微距长焦，超高速风驰闪拍，北斗卫星图片消息', 1002, '/resource/image/goods2.webp', '/resource/image/goods2_swiper1.webp', 'xxx', 7999, 7999, 10, '', 0, 0, '2024-05-26 15:24:11', 0, '2024-05-26 15:24:11');
INSERT INTO `goods_info` VALUES (3, 'Redmi Pad Pro', '12.1英寸2.5K旗舰机大屏 | 10000mAh超大电池 | Xiaomi HyperOS 流畅体验', 2001, '/resource/image/goods3.webp', '/resource/image/goods3_swiper1.png', 'zzz', 2299, 2299, 10, '', 0, 0, '2024-05-26 15:29:02', 0, '2024-05-26 15:29:02');

-- ----------------------------
-- Table structure for index_config
-- ----------------------------
DROP TABLE IF EXISTS `index_config`;
CREATE TABLE `index_config`  (
  `config_id` bigint NOT NULL AUTO_INCREMENT COMMENT '首页配置项主键id',
  `config_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '' COMMENT '显示字符(配置搜索时不可为空，其他可为空)',
  `config_type` tinyint NOT NULL DEFAULT 0 COMMENT '1-搜索框热搜 2-搜索下拉框热搜 3-(首页)热销商品 4-(首页)新品上线 5-(首页)为你推荐',
  `goods_id` bigint UNSIGNED NOT NULL DEFAULT 0 COMMENT '商品id 默认为0',
  `redirect_url` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '##' COMMENT '点击后的跳转地址(默认不跳转)',
  `config_rank` int NOT NULL DEFAULT 0 COMMENT '排序值(字段越大越靠前)',
  `is_deleted` tinyint NOT NULL DEFAULT 0 COMMENT '删除标识字段(0-未删除 1-已删除)',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_user` int NOT NULL DEFAULT 0 COMMENT '创建者id',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最新修改时间',
  `update_user` int NULL DEFAULT 0 COMMENT '修改者id',
  PRIMARY KEY (`config_id`) USING BTREE,
  INDEX `ID`(`goods_id` ASC) USING BTREE,
  CONSTRAINT `商品ID11` FOREIGN KEY (`goods_id`) REFERENCES `goods_info` (`goods_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of index_config
-- ----------------------------
INSERT INTO `index_config` VALUES (1, '', 3, 1, '##', 0, 0, '2024-05-26 15:32:19', 0, '2024-05-26 15:32:19', 0);
INSERT INTO `index_config` VALUES (2, '', 4, 2, '##', 0, 0, '2024-05-26 15:32:43', 0, '2024-05-26 15:32:43', 0);
INSERT INTO `index_config` VALUES (3, '', 5, 3, '##', 0, 0, '2024-05-26 15:32:53', 0, '2024-05-26 15:32:53', 0);

-- ----------------------------
-- Table structure for order_info
-- ----------------------------
DROP TABLE IF EXISTS `order_info`;
CREATE TABLE `order_info`  (
  `order_id` bigint NOT NULL AUTO_INCREMENT COMMENT '订单表主键id',
  `user_id` int NOT NULL DEFAULT 0 COMMENT '用户主键id',
  `total_price` float NOT NULL DEFAULT 1 COMMENT '订单总价',
  `pay_status` tinyint NOT NULL DEFAULT 0 COMMENT '支付状态:0.未支付,1.支付成功,-1:支付失败',
  `pay_type` tinyint NOT NULL DEFAULT 0 COMMENT '0.无 1.支付宝支付 2.微信支付',
  `pay_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '支付时间',
  `order_status` tinyint NOT NULL DEFAULT 0 COMMENT '订单状态:0.待支付 1.已支付 2.配货完成 3:出库成功 4.交易成功 -1.手动关闭 -2.超时关闭 -3.商家关闭',
  `extra_info` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '' COMMENT '订单body',
  `is_deleted` tinyint NOT NULL DEFAULT 0 COMMENT '删除标识字段(0-未删除 1-已删除)',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最新修改时间',
  `address_id` int NOT NULL,
  PRIMARY KEY (`order_id`) USING BTREE,
  INDEX `连接用户`(`user_id` ASC) USING BTREE,
  CONSTRAINT `用户ID外键` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_info
-- ----------------------------
INSERT INTO `order_info` VALUES (21, 1, 31996, 0, 0, '2024-06-10 09:54:07', 4, '', 0, '2024-06-10 09:54:07', '2024-06-10 09:54:07', 1);
INSERT INTO `order_info` VALUES (22, 1, 38893, 0, 1, '2024-06-10 09:55:24', -1, '', 0, '2024-06-10 09:55:24', '2024-06-10 09:55:24', 1);
INSERT INTO `order_info` VALUES (23, 1, 6999, 0, 1, '2024-06-11 06:19:33', -1, '', 0, '2024-06-11 06:19:33', '2024-06-11 06:19:33', 1);
INSERT INTO `order_info` VALUES (24, 1, 6999, 0, 0, '2024-06-12 02:46:32', 0, '', 0, '2024-06-12 02:46:32', '2024-06-12 02:46:32', 1);

-- ----------------------------
-- Table structure for orderitem_info
-- ----------------------------
DROP TABLE IF EXISTS `orderitem_info`;
CREATE TABLE `orderitem_info`  (
  `order_item_id` bigint NOT NULL AUTO_INCREMENT COMMENT '订单关联购物项主键id',
  `order_id` bigint NOT NULL DEFAULT 0 COMMENT '订单主键id',
  `goods_id` bigint UNSIGNED NOT NULL DEFAULT 0 COMMENT '关联商品id',
  `selling_price` int NOT NULL DEFAULT 1 COMMENT '下单时商品的价格(订单快照)',
  `goods_count` int NOT NULL DEFAULT 1 COMMENT '数量(订单快照)',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `goods_name` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '' COMMENT '下单时商品的名称(订单快照)',
  `goods_cover_img` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '' COMMENT '下单时商品的主图(订单快照)',
  PRIMARY KEY (`order_item_id`) USING BTREE,
  INDEX `与订单连接`(`order_id` ASC) USING BTREE,
  INDEX `与商品连接`(`goods_id` ASC) USING BTREE,
  CONSTRAINT `商品ID` FOREIGN KEY (`goods_id`) REFERENCES `goods_info` (`goods_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `订单ID` FOREIGN KEY (`order_id`) REFERENCES `order_info` (`order_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of orderitem_info
-- ----------------------------
INSERT INTO `orderitem_info` VALUES (2, 21, 2, 7999, 4, '2024-06-10 09:54:07', 'HUAWEI Pura 70 Pro', '/resource/image/goods2.webp');
INSERT INTO `orderitem_info` VALUES (3, 22, 3, 2299, 3, '2024-06-10 09:55:24', 'Redmi Pad Pro', '/resource/image/goods3.webp');
INSERT INTO `orderitem_info` VALUES (4, 22, 2, 7999, 4, '2024-06-10 09:55:24', 'HUAWEI Pura 70 Pro', '/resource/image/goods2.webp');
INSERT INTO `orderitem_info` VALUES (5, 23, 1, 6999, 1, '2024-06-11 06:19:33', 'Xiaomi 14 Ultra', '/resource/image/goods1.webp');
INSERT INTO `orderitem_info` VALUES (6, 24, 1, 6999, 1, '2024-06-12 02:46:32', 'Xiaomi 14 Ultra', '/resource/image/goods1.webp');

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `user_id` int NOT NULL AUTO_INCREMENT COMMENT '用户主键',
  `nick_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '' COMMENT '用户昵称',
  `login_name` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '' COMMENT '手机号（登录名）',
  `password` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '' COMMENT '密码',
  `user_intro` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '' COMMENT '介绍信息',
  `is_delete` tinyint NOT NULL DEFAULT 0 COMMENT '删除信息',
  `user_avatar` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '头像',
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE INDEX `uniName`(`login_name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES (1, '13535989824', '13535989824', '$2a$10$FEh9vazvT.zixqbdhRJ87eL/i/dOXgZ0QoeZan27.Fvyak9ZetdIC', '测试11111', 0, NULL);
INSERT INTO `user_info` VALUES (5, '13535989324', '13535989324', '$2a$10$DcIVZZTwVt.A8cNuAcNrbeMrW6ceL1JOWkkgGsCN7ABlnBB2ECmfO', '测试11111', 0, NULL);

SET FOREIGN_KEY_CHECKS = 1;
