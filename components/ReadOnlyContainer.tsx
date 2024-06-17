import { FC, ReactNode } from 'react'

interface ReadOnlyContainerProps {
  isReadOnly?: boolean;
  children: ReactNode;
}

const ReadOnlyContainer: FC<ReadOnlyContainerProps> = ({ isReadOnly = false, children }) =>(
  <div data-brand={"stonex"} data-theme={"light"}>
    {
      isReadOnly ? (
        <div className="read-only-container" title="Read-only parameter">
          {children}
        </div>
      ) : (
        <>{children}</>
      )
    }
  </div>
)

export default ReadOnlyContainer
