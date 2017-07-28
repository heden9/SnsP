import React from 'react';
import {
    NativeModules,
    LayoutAnimation,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    PanResponder,
    View,
    Easing
} from 'react-native';

export default class Demo extends React.Component {
    state:{
        trans:AnimatedValueXY,
    }
    _panResponder:PanResponder;
    constructor(props) {
        super(props);
        this.state = {
            trans: new Animated.ValueXY(),
            anim: new Animated.Value(0)
        };
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true, //响应手势
            onPanResponderMove: Animated.event(
                [null, {dx: this.state.trans.x, dy:this.state.trans.y}] // 绑定动画值
            ),
            onPanResponderRelease: (evt, gestureState)=>{//手松开，回到原始位置
                console.warn(gestureState.vy);
                Animated.spring(this.state.trans,{toValue: {x: 0, y: 0}}
                ).start();
                // Animated.sequence([
                //     Animated.timing(this.state.trans, {
                //         toValue: 0,
                //         easing: Easing.bounce,
                //     }),
                //     Animated.delay(200),
                //     Animated.timing(this.state.trans, {
                //         toValue: {x: 100, y: 300},
                //         easing: Easing.elastic(2),
                //     }),
                //     Animated.delay(100),
                //     Animated.timing(this.state.trans, {
                //         toValue: {x: Math.random()*100, y: Math.random()*100},
                //         easing: Easing.poly(2),
                //     }),
                //     Animated.timing(this.state.trans, {
                //         toValue: 0,
                //         easing: Easing.elastic(1),
                //     })
                // ]).start();
                Animated.spring(this.state.anim, {
                    toValue: 0,
                    velocity: 7,
                    tension: 10,
                    friction: 3,
                }).start();
            },
            onPanResponderTerminate:()=>{//手势中断，回到原始位置
                Animated.spring(this.state.trans,{toValue: {x: 0, y: 0}}
                ).start();
            },
        });
    }
    render() {
        return (
            <View style={StyleSheet.absoluteFill}>
                <Animated.View style={{width:100,
                    height:100,
                    borderRadius:50,
                    backgroundColor:'red',
                    transform:[
                        {translateY:this.state.trans.y},
                        {translateX:this.state.trans.x},
                    ],
                }}
                               {...this._panResponder.panHandlers}
                >
                </Animated.View>
                <Animated.View
                    style={[{
                        width: 100,
                        height: 100,
                        backgroundColor: 'red',
                        transform: [
                            {scale: this.state.anim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 3],
                            })},
                            {translateX: this.state.anim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 100],
                            })},
                            {rotate: this.state.anim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [
                                    '0deg', '720deg'
                                ],
                            })},
                        ]}
                    ]}>
                    <Text>123123</Text>
                </Animated.View>
            </View>
        );
    }
}