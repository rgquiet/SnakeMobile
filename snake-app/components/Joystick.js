import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { MultiTouchView } from 'expo-multi-touch';
import Pad from './Pad';
import Direction from './Direction';

class Joystick extends Component {
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
                let currentDirection = this.onChangeDirection(currentTouch.angle);
                if(currentDirection !== this.state.direction) {
                    console.log(currentDirection);
                    this.setState({
                        direction: currentDirection
                    });
                }
            }
        },
        onTouchEnded: (event) => { this.onTouchOver(event); },
        onTouchCancelled: (event) => { this.onTouchOver(event); }
    };

    onTouchOver(event) {
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

    onChangeDirection(angle) {
        if(angle < -2 || angle > 2) {
            return Direction.LEFT;
        } else if(angle >= -2 && angle < -1) {
            return Direction.UP;
        } else if(angle >= -1 && angle < 1) {
            return Direction.RIGHT;
        } else {
            return Direction.DOWN;
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
                        skin={this.props.skin}
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

const mapStateToProps = (state) => {
    return {skin: state.player.skin};
}

export default connect(mapStateToProps)(Joystick);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    }
});
