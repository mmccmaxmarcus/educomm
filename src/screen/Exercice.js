import React from "react";
import { View, StyleSheet, StatusBar, Text, SafeAreaView, Button } from "react-native";

//import {  ButtonContainer, Alert } from "../components/Button";
import { Alert } from "../components/Alert";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#36B1F0",
        flex: 1,
        paddingHorizontal: 20
    },
    text: {
        color: "black",
        fontSize: 25,
        textAlign: "center",
        letterSpacing: -0.02,
        fontWeight: "600"
    },
    safearea: {
        flex: 1,
        marginTop: 100,
        justifyContent: "space-between"
    }
});

class Exercice extends React.Component {
    state = {
        correctCount: 0,
        totalCount: this.props.navigation.getParam("questions", []).length || null,
        activeQuestionIndex: 0,
        answered: false,
        answerCorrect: false
    };

    answer = correct => {
        this.setState(
            state => {
                const nextState = { answered: true };

                if (correct) {
                    nextState.correctCount = state.correctCount + 1;
                    nextState.answerCorrect = true;
                } else {
                    nextState.answerCorrect = false;
                }

                return nextState;
            },
            () => {
                setTimeout(() => this.nextQuestion(), 750);
            }
        );
    };

    nextQuestion = () => {
        this.setState(state => {
            let nextIndex = state.activeQuestionIndex + 1;

            if (nextIndex >= state.totalCount) {
                nextIndex = state.activeQuestionIndex = 0
                this.props.navigation.popToTop();
            }

            return {
                activeQuestionIndex: nextIndex,
                answered: false
            };
        });
    };

    render() {
        const questions = this.props.navigation.getParam("questions");
        const question = questions[this.state.activeQuestionIndex];

        return (
            <View
                style={[
                    styles.container,
                    { backgroundColor: this.props.navigation.getParam("color") }
                ]}
            >
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={styles.safearea}>
                    <View>
                        <Text style={styles.text}>{question.text}</Text>

                        {question.exercices.map(answer => (
                            <Button
                                title={answer.subText}
                                key={answer.id}
                                onPress={() => this.answer(answer.correct)}
                            />
                        ))}
                    </View>

                    <Text style={styles.text}>
                        {`${this.state.correctCount}/${this.state.totalCount}`}
                    </Text>
                </SafeAreaView>
                <Alert
                    correct={this.state.answerCorrect}
                    visible={this.state.answered}
                />
            </View>
        );
    }
}

export default Exercice;