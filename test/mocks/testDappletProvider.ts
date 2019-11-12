import { DappletProvider } from '../../src/interfaces/dappletProvider';
import { DappletTemplate } from '../../src/types/dappletTemplate';

export class TestDappletProvider implements DappletProvider {

    async loadDapplet(id: string): Promise<DappletTemplate> {
        switch (id) {
            case "4":
                return {
                    aliases: {
                        // ToDo: remove array
                      "view-plain-mustache": ["http://types.dapplets.org/view/plain-mustache/1.0"],
                      "view-html-mustache": ["http://types.dapplets.org/view/html-mustache/1.0"],
                      "builder-tx-sol": ["http://types.dapplets.org/ethereum/txbuilders/solidity/1.0"]
                    },
              
                    views: [
                      {
                        type: "view-html-mustache",
                        template: "<div style=\"margin-bottom: 16px;\"><img style=\"float:left;height:48px;margin-right:8px;\" src=\"{{authorImg}}\"\/><div><b>{{authorFullname}}<\/b><\/div><div style=\"font-size:smaller;color:#777;\">{{authorUsername}}<\/div><\/div><div style=\"clear:both;\">{{text}}<\/div><div style=\"font-size:10px;color:#777;margin-top:10px;\">ID {{id}}<\/div>"
                      },
                      {
                        type: "view-plain-mustache",
                        template: "Add the tweet #{{id}} \"{{text}}\" from user @{{authorUsername}} to the registry."
                      }
                    ],
              
                    transactions: {
                      "addTweetToRegistry": {
                        type: "builder-tx-sol",
                        from: "&Addresses[0]",
                        to: "0xccf7930d9b1fa67d101e3de18de5416dc66bd852",
                        function: "storeTweetHash(uint256,uint256)",
                        args: ["id:bigNumberify", "text:toUtf8Bytes:sha256"]
                      }
                    }
                  };
            case "5":
                return {
                    "aliases": {
                        "view-plain-mustache": ["http://types.dapplets.org/view/plain-mustache/1.0"],
                        "builder-tx-sol": ["http://types.dapplets.org/ethereum/txbuilders/solidity/1.0"]
                    },
                    
                    "views": [
                        {
                            "type": "view-plain-mustache",
                            "template": "Send 0.0005 ETH to Dapplet Dev Wallet."
                        }
                    ],
                
                    "transactions": {
                        "send": {
                            "type" : "builder-tx-sol",
                            "from": "&Addresses[0]",
                            "to": "0x84bf358e71F3c033d3B4F7cE2eF56A7Ff14c76A4",
                            "value": 500000000000000
                        }
                    }
                };
            default:
                throw new Error("There is no template with such id.");
        }
    }
}