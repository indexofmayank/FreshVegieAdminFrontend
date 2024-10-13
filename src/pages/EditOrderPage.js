import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function EditOrderPage() {

    const { id } = useParams();

    console.log(id)
    return (
        <p>{id}</p>
    )
}

export default EditOrderPage;