import { useRef } from 'react';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { TextAreaInput } from '../../components/TextAreaInput';
import { Container, Content } from './styles';
import { KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';

export function Departure() {

    const keyboardAvoidingViewBehavior = Platform.OS === 'android' ? 'height' : 'position';

    const descriptionRef = useRef<TextInput>(null);

    function handleDepartureRegister() {
        console.log('OK!');
    }


    return (
        <Container>
            <Header title='Saída' />

            <KeyboardAvoidingView style={{ flex: 1 }} behavior={keyboardAvoidingViewBehavior} >
                <ScrollView>

                    <Content>
                        <LicensePlateInput
                            label='Placa do veículo'
                            placeholder="BRA1234"
                            onSubmitEditing={() => {
                                descriptionRef.current?.focus()
                            }}
                            returnKeyType='next'
                        />

                        <TextAreaInput
                            ref={descriptionRef}
                            label='Finalidade'
                            placeholder='Vou utilizar o veículo para...'
                            onSubmitEditing={handleDepartureRegister}
                            returnKeyType='send'
                            blurOnSubmit
                        />
                        <TextAreaInput
                            ref={descriptionRef}
                            label='Finalidade'
                            placeholder='Vou utilizar o veículo para...'
                            onSubmitEditing={handleDepartureRegister}
                            returnKeyType='send'
                            blurOnSubmit
                        />
                        <TextAreaInput
                            ref={descriptionRef}
                            label='Finalidade'
                            placeholder='Vou utilizar o veículo para...'
                            onSubmitEditing={handleDepartureRegister}
                            returnKeyType='send'
                            blurOnSubmit
                        />
                        <TextAreaInput
                            ref={descriptionRef}
                            label='Finalidade'
                            placeholder='Vou utilizar o veículo para...'
                            onSubmitEditing={handleDepartureRegister}
                            returnKeyType='send'
                            blurOnSubmit
                        />
                        <TextAreaInput
                            ref={descriptionRef}
                            label='Finalidade'
                            placeholder='Vou utilizar o veículo para...'
                            onSubmitEditing={handleDepartureRegister}
                            returnKeyType='send'
                            blurOnSubmit
                        />

                        <Button
                            title='Registar Saída'
                            onPress={handleDepartureRegister}
                        />
                    </Content>
                </ScrollView>
            </KeyboardAvoidingView>


        </Container>
    );
}