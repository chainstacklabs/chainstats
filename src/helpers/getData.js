import axios from 'axios';

const fetchProtocolData = async () => {
  try {
    const response = await axios.get(
      'https://console.chainstack.com/api/core/v1/calc/'
    );
    return response.data.Enterprise.protocols;
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};

const parseProtocolData = (protocols) => {
  const parsedData = [];

  for (const protocol in protocols) {
    for (const network in protocols[protocol]) {
      const { dedicated: dedicatedData } = protocols[protocol][network];

      if (dedicatedData) {
        const { full, archive } = dedicatedData;
        const fullParsed = full ? parseNodeData(full) : undefined;
        const archiveParsed = archive ? parseNodeData(archive) : undefined;

        const protocolItem = {
          protocol,
          network,
          ...(fullParsed && { full: fullParsed }),
          ...(archiveParsed && { archive: archiveParsed }),
        };

        parsedData.push(protocolItem);
      }
    }
  }

  return parsedData;
};

const parseNodeData = (nodeData) => {
  const parsedNodeData = [];
  for (const client in nodeData) {
    if (nodeData.hasOwnProperty(client)) {
      parsedNodeData.push({
        node_data: {
          client,
          size_required: nodeData[client].node_info.storage.size_required,
        },
      });
    }
  }

  return parsedNodeData;
};

const processData = async () => {
  try {
    const protocolData = await fetchProtocolData();
    const parsedProtocolData = parseProtocolData(protocolData); // This it the JS object you can manipulate
    //console.log(JSON.stringify(parsedProtocolData, null, 2)); // This is just so you can see how the entire object looks like
    return parsedProtocolData;
  } catch (error) {
    console.error('Error processing data: ', error);
  }
};

export default processData;

let mock_demo_not_exported = [
  {
    protocol: 'aptos',
    network: 'aptos-mainnet',
    full: [
      {
        node_data: {
          client: 'aptos-core',
          size_required: 220,
        },
      },
    ],
    archive: [
      {
        node_data: {
          client: 'aptos-core',
          size_required: 270,
        },
      },
    ],
  },
  {
    protocol: 'aptos',
    network: 'aptos-testnet',
    full: [
      {
        node_data: {
          client: 'aptos-core',
          size_required: 540,
        },
      },
    ],
    archive: [
      {
        node_data: {
          client: 'aptos-core',
          size_required: 650,
        },
      },
    ],
  },
];
