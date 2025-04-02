interface NotFoundProps {
  message?: string;
}

const NotFound: React.FC<NotFoundProps> = ({
  message = 'Company not found',
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
      <h3 className="text-lg font-medium text-gray-900">{message}</h3>
    </div>
  );
};

export default NotFound;
