import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { MultiTouchView } from 'expo-multi-touch';
import Pad from './Pad';

export default class Joystick extends Component {
    firstTouchStart = {x: 0, y: 0};
    firstTouchPosition = {x: 0, y: 0};
    firstTouchForce = 0;

    state = {
        touches: {},
        show: false,
        direction: ''
    };

    touchProps = {
        onTouchBegan: (event) => {
            const {identifier} = event;
            this.setState((previous) => ({
                touches: {
                    ...previous.touches,
                    [identifier]: event,
                }
            }));
            if(identifier === 0) {
                this.setState({
                    show: true
                });
            }
        },
        onTouchMoved: (event) => {
            const {identifier} = event;
            this.setState((previous) => ({
                touches: {
                    ...previous.touches,
                    [identifier]: event,
                },
            }));
            let currentTouch = this.pad;
            if(currentTouch.speed === 1) {
                let currentDirection = this.onChangeDirectionHandler(currentTouch.angle);
                if(currentDirection !== this.state.direction) {
                    console.log(currentDirection);
                    this.setState({
                        direction: currentDirection
                    });
                }
            }
        },
        onTouchEnded: (event) => { this.onTouchOverHandler(event); },
        onTouchCancelled: (event) => { this.onTouchOverHandler(event); }
    };

    onTouchOverHandler(event) {
        const {identifier} = event;
        this.setState((previous) => ({
            touches: {
                ...previous.touches,
                [identifier]: null,
            }
        }));
        if(identifier === 0) {
            this.setState({
                show: false
            });
        }
    };

    onChangeDirectionHandler(angle) {
        if(angle < -2 || angle > 2) {
            return 'left';
        } else if(angle >= -2 && angle < -1) {
            return 'up';
        } else if(angle >= -1 && angle < 1) {
            return 'right';
        } else {
            return 'down';
        }
    }

    render() {
        const {touches, show} = this.state;
        const firstTouch = touches[0];

        if(firstTouch && firstTouch.initialTouch) {
            this.firstTouchStart = {
                x: firstTouch.initialTouch.pageX,
                y: firstTouch.initialTouch.pageY,
            };
            this.firstTouchPosition = {
                x: firstTouch.pageX,
                y: firstTouch.pageY,
            };
            this.firstTouchForce = firstTouch.force || 0;
        }

        return (
            <MultiTouchView style={{flex: 1}} {...this.touchProps}>
                <View style={styles.container}>
                    {this.props.children}
                    <Pad
                        visible={show}
                        center={this.firstTouchStart}
                        touchPosition={this.firstTouchPosition}
                        force={this.firstTouchForce}
                        ref={ref => (this.pad = ref)}
                    />
                </View>
            </MultiTouchView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    }
});
