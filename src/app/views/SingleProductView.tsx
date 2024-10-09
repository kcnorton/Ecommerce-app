import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { getProducts } from '../api/products';

const SingleProductView = () => {
    const { id } = useParams<{ id: string }>();
    const products = getProducts();
    const formattedId = parseInt(id);
    const product = products.find((product) => product?.id === formattedId);

    const [count, setCount] = useState(1);
    const [isOn, setIsOn] = useState(false);
    const [text, setText] = useState('');
    const [comments, setComments] = useState<{ text: string }[]>([]);
    const [rating, setRating] = useState(0);
    const stars = [1, 2, 3, 4, 5];

    const addComment = () => {
        if (text) {
            setComments([...comments, { text }]);
            setText('');
        }
    };

    const removeComment = (index: number) => {
        const newComments = [...comments];
        newComments.splice(index, 1);
        setComments(newComments);
    };
    return (
        <div className="flex justify-center gap-20">
            <div className="m-2">
                <h1>{product?.title}</h1>
                <img
                    alt="Product image"
                    src={product?.image}
                    width="120px"
                    height="120px"
                />
                <div className="flex">
                    <p className="p-2">Quantity: </p>
                    <button
                        className="rounded bg-cyan-200 p-2"
                        onClick={() => setCount(count + 1)}
                    >
                        +
                    </button>
                    <div className="p-2">{count}</div>
                    <button
                        className="rounded bg-cyan-200 p-2"
                        onClick={() => count > 0 && setCount(count - 1)}
                    >
                        -
                    </button>
                </div>
                <button
                    className="rounded bg-cyan-200 m-2 p-2"
                    onClick={() => setIsOn(!isOn)}
                >
                    {isOn ? 'remove from bag' : 'add to bag'}
                </button>
            </div>
            <div className="m-2">
                <h1>Comments</h1>
                <input
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    placeholder="add comment"
                />
                <button onClick={addComment}>Add</button>
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index}>
                            {comment.text}
                            <button
                                className="px-2"
                                onClick={() => removeComment(index)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
                <h1>Star Rating</h1>
                {stars.map((starValue, index) => {
                    return (
                        <span
                            key={index}
                            onClick={() => setRating(starValue)}
                            className={`cursor-pointer mr-3 text-2xl ${
                                starValue <= rating
                                    ? `text-yellow-300`
                                    : `text-slate-400`
                            }`}
                        >
                            *
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default SingleProductView;
