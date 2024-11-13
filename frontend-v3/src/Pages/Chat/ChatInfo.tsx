import Avatar from './Avatar';

type Props = {
    author: string;
    id: string;
};


export default function ChatInfo({author, id} : Props) {
    return (
        <div className='flex hover:shadow-lg p-1 rounded cursor-pointer'>
            <Avatar
                    size='lg'
                    name={author}
                    imgSrc='/images/thang.png'
                />
            <div className='ml-3 justify-center align-middle'>
                <span>{author}</span>
                <p className='text-sm font-medium text-gray-500'>{id}</p>
            </div>
        </div>
    )
}