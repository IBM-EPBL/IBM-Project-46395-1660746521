import React from "react"
import Swal from "sweetalert2"
import { server } from "../../config"

export default function expensePage(email, balance, func) {
    // render() {
    const alertUser = async () => {
        const { value: formValues } = await Swal.fire({
            title: "Add Expense",
            html: '<input id="amount" class="swal2-input" placeholder="Enter amount" type="number">' +
                '<select name="category" class="swal2-input" id="category" ><option value="" disabled selected>Select category</option><option value="grocerry">Grocerry</option><option value="utility bills">Utility Bills</option><option value="transport">Transport</option><option value="education">Education</option><option value="medicine">Medicine</option><option value="others">Others</option></select>',
            position: 'center',
            showConfirmButton: true,
            showCancelButton: true,
            showCloseButton: true,
            timerProgressBar: false,
            confirmButtonText: "Add",
            confirmButtonColor: "green",
            preConfirm: () => {
                return [
                    document.getElementById('amount').value,
                    document.getElementById('category').value
                ]
            }
        })

        if (formValues) {
            if (formValues[0] === '' || formValues[1] === '' || parseInt(formValues[0])<= 0) {
                Swal.fire({
                    title: "Invalid Expense",
                    text: "Please provide both values",
                    position: 'center',
                    showConfirmButton: false,
                    icon: 'error',
                    toast: true,
                    timerProgressBar: true,
                    timer: 2000
                })
            } else {
                const url = new URL(server+"/addExpense")
                let expense = {
                    amount: parseInt(formValues[0]),
                    category: formValues[1],
                    email: email
                }
                const res = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(expense)
                })
                const data = await res.json()
                if (data.status === 200) {
                    Swal.fire({
                        text: "Successfully Added",
                        position: 'top-right',
                        showConfirmButton: false,
                        icon: 'success',
                        toast: true,
                        timerProgressBar: true,
                        timer: 2000
                    })
                    if (balance - parseInt(formValues[0]) < 0) {
                        let url = new URL(server+"/limitExceed")
                        url.searchParams.set('email', email)
                        fetch(url).then((res) => {
                            console.log(res.json())
                        })
                    }
                } else {
                    Swal.fire({
                        text: "Error ocuured",
                        position: 'center',
                        showConfirmButton: false,
                        icon: 'error',
                        toast: true,
                        timerProgressBar: true,
                        timer: 2000
                    })
                }
                func()
            }
        }
    }

    return (<>
        {alertUser()}
    </>)

    // }
}