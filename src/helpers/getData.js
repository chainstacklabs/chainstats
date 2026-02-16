import axios from 'axios';

const fetchProtocolData = async () => {
  try {
    const response = await axios.get(
      'https://console.chainstack.com/api/core/v1/calc/'
    );
    return response.data.Enterprise.protocols;
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
};

const parseProtocolData = (protocols) => {
  const parsedData = [];

  for (const protocol in protocols) {
    for (const network in protocols[protocol]) {
      const { dedicated: dedicatedData } = protocols[protocol][network];

      if (dedicatedData) {
        const { full, archive } = dedicatedData;
        const fullParsed = full ? parseNodeData(full) : [];
        const archiveParsed = archive ? parseNodeData(archive) : [];

        const protocolItem = {
          protocol,
          network,
          ...(fullParsed.length && { full: fullParsed }),
          ...(archiveParsed.length && { archive: archiveParsed }),
        };

        if (protocolItem.full || protocolItem.archive) {
          parsedData.push(protocolItem);
        }
      }
    }
  }

  return parsedData;
};

const parseNodeData = (nodeData) => {
  const parsedNodeData = [];
  for (const client in nodeData) {
    if (Object.hasOwn(nodeData, client)) {
      const clientData = nodeData[client];
      const sizeRequired = clientData?.node_info?.storage?.size_required;

      if (
        clientData?.type !== 'public' ||
        sizeRequired === null ||
        sizeRequired === undefined
      ) {
        continue;
      }

      const normalizedSize = Number(sizeRequired);

      if (!Number.isFinite(normalizedSize)) {
        continue;
      }

      parsedNodeData.push({
        node_data: {
          client,
          size_required: normalizedSize,
        },
      });
    }
  }

  return parsedNodeData;
};

const processData = async () => {
  const protocolData = await fetchProtocolData();
  const parsedProtocolData = parseProtocolData(protocolData);
  return parsedProtocolData;
};

export default processData;
