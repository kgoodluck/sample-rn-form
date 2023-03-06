import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';


export default function RegForm({ onSubmit, initialValues }) {

    const [teudatZeut, setTeudatZeut] = useState(initialValues.teudatZeud);
    const [phone, SetPhone] = useState(initialValues.phone);
    const [firstName, setFirstName] = useState(initialValues.firstName);
    const [lastName, setLastName] = useState(initialValues.lastName);

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    function isValidTeudatZeut(id) {
        var id = String(id).trim();
        if (id.length != 9 || isNaN(id)) return false;
      
        return Array.from(id, Number).reduce((counter, digit, i) => {
            const step = digit * ((i % 2) + 1);
            return counter + (step > 9 ? step - 9 : step);
        }) % 10 === 0;
    }

    const validName = /^[A-Za-z]+$/;
    const israeliPhoneNumber = 
    // regex that matches Israeli phone number
    /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/

    const isValidName = (name) => validName.test(name)
    const isValidIsraeliPhone = (phone) => israeliPhoneNumber.test(phone)

    useEffect(() => {
        const isValidForm = isValidIsraeliPhone(phone) 
                            && isValidTeudatZeut(teudatZeut) 
                            && isValidName(firstName) 
                            && isValidName(lastName)

        isValidForm
            ? setIsButtonDisabled(false) 
            : setIsButtonDisabled(true)
    }, [teudatZeut, phone, firstName, lastName])

    return (
        <View>
            <Text>Teudat Zeut</Text>
            <TextInput value={teudatZeut} onChangeText={text => setTeudatZeut(text)} />
            <Text>Phone</Text>
            <TextInput value={phone} onChangeText={text => SetPhone(text)}/>
            <Text>First name</Text>
            <TextInput value={firstName} onChangeText={text => setFirstName(text)}/>
            <Text>Last name</Text>
            <TextInput value={lastName} onChangeText={text => setLastName(text)}/>
            <Button
                title='Save' 
                onPress={() => onSubmit()}
                disabled={isButtonDisabled}
            />
        </View>
    )
}

RegForm.defaultProps = {
    initialValues: { teudatZeut: '', phone: '', firstName: '', lastName: '' }
}
