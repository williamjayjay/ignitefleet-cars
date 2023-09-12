import React, { useEffect, useState } from 'react';
import { Container, Content, Label, Title } from './styles';
import { HomeHeader } from '../../components/HomeHeader';
import { CarStatus } from '../../components/CarStatus';
import { useNavigation } from '@react-navigation/native';
import { Historic } from '../../libs/realm/schemas/Historic';
import { useQuery, useRealm } from '../../libs/realm';
import { Alert, FlatList } from 'react-native';
import { HistoricCard, HistoricCardProps } from '../../components/HistoricCard';
import dayjs from 'dayjs';

export function Home() {
    const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);
    const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>([]);

    const { navigate } = useNavigation();

    const historic = useQuery(Historic);
    const realm = useRealm();

    function handleRegisterMoviment() {
        if (vehicleInUse?._id) {
            navigate('arrival', { id: vehicleInUse._id.toString() });
        } else {
            navigate('departure')
        }
    }

    function fetchHistoric() {
        try {
            const response = historic.filtered("status='arrival' SORT(created_at DESC)");
            const formattedHistoric = response.map((item) => {
                return ({
                    id: item._id.toString(),
                    licensePlate: item.license_plate,
                    isSync: false,
                    created: dayjs(item.created_at).format('[Saída em] DD/MM/YYYY [às] HH:mm')

                })
            })
            setVehicleHistoric(formattedHistoric);
        } catch (error) {
            console.log(error);
            Alert.alert('Histórico', 'Não foi possível carregar o histórico.')
        }


    }

    function fetchVehicleInUse() {
        try {
            const vehicle = historic.filtered("status='departure'")[0];
            setVehicleInUse(vehicle);
        } catch (error) {
            Alert.alert('Veículo em uso', 'Não foi possível carregar o veículo em uso.');
            console.log(error);
        }
    }


    useEffect(() => {
        fetchVehicleInUse();
    }, [])

    useEffect(() => {
        realm.addListener('change', () => fetchVehicleInUse())

        return () => {
            if (realm && !realm.isClosed) {
                realm.removeListener('change', fetchVehicleInUse)
            }
        };

    }, [])


    useEffect(() => {
        fetchHistoric();
    }, [historic]);

    function handleHistoricDetails(id: string) {
        navigate('arrival', { id })
    }

    return (
        <Container >
            <HomeHeader />
            <Content>
                <CarStatus
                    licensePlate={vehicleInUse?.license_plate}
                    onPress={handleRegisterMoviment}
                />
                <Title>
                    Histórico
                </Title>

                <FlatList
                    data={vehicleHistoric}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <HistoricCard
                            onPress={() => handleHistoricDetails(item.id)}
                            data={item} />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    ListEmptyComponent={(
                        <Label>
                            Nenhum registro de utilização.
                        </Label>
                    )}
                />
            </Content>
        </Container>
    );
}