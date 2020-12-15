import React from 'react'
import { Button } from '@material-ui/core';
import Widget from './shared/Widget';

type UploadWidgetProps = {
}

const UploadWidget: React.FC<UploadWidgetProps> = () => {
  return (
    <Widget
      body={
        <Button
          component="label"
        >
          <input
            type="file"
            className="inputFileBtnHide"
          />
        </Button>
      }
    />
  )
}

export default UploadWidget;
