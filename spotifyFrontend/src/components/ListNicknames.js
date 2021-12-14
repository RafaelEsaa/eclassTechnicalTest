import React, { useEffect, useState } from 'react';

const ListNicknames = ({ names, order }) => {
    const [dataOrdenaded, setDataOrdenaded] = useState([]);
    
    useEffect(() => {
        if(names || order){
            const data = names.map(name => name && name.replaceAll(' ', '')).filter(value => value);
            console.log(data)
            //asc
            if (order.toLowerCase() === 'asc') {
                setDataOrdenaded(data.sort((a, b) => a < b ? -1 : 1))
            } else {
            //desc
                setDataOrdenaded(data.sort((a, b) => a > b ? -1 : 1))
            }
        }
    }, [names, order])

    return (
        <div className="list-nicknames">
            {
                dataOrdenaded.length && dataOrdenaded.map((name, index) => {
                    return (
                        <div key={index} className="list-nicknames__item">
                            <span className="list-nicknames__item-name">{name}</span>
                        </div>
                    );
                })
            }
        </div>
    );
}
 
export default ListNicknames;