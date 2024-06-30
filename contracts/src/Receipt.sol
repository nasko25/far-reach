// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";

contract Receipt is ERC721, Ownable {
    string public productName;
    uint256 public formattedPrice;
    string public merchantName;
    uint16 public stock;
    mapping(address => string) public dateOfPurchase;

    uint256 private _totalSupply;

    constructor(
        string memory _productName,
        uint256 _formattedPrice,
        string memory _merchantName,
        uint16 _stock
    ) ERC721("Receipt", "RCPT") Ownable(msg.sender) {
        productName = _productName;
        formattedPrice = _formattedPrice;
        merchantName = _merchantName;
        stock = _stock;
        _totalSupply = 0;
    }

    function emitReceipt(address _to, string memory _date) external onlyOwner {
        _safeMint(_to, _totalSupply);
        dateOfPurchase[_to] = _date;
        _totalSupply++;
    }

    function uint2str(
        uint256 _i
    ) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        string memory svg = string.concat(
            '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">',
            '<text x="20" y="40" font-size="22" font-family="sans-serif">',
            merchantName,
            '</text><text x="20" y="80" font-size="16" font-family="sans-serif">',
            "Product",
            '</text><text x="240" y="80" font-size="16" font-family="sans-serif">',
            "Price",
            '</text><rect x="20" y="90" width="90%" height="1" /><text x="20" y="120" font-size="16" font-family="sans-serif">',
            productName,
            '</text><text x="240" y="120" font-size="16" font-family="sans-serif">$',
            uint2str(formattedPrice),
            '</text><text x="20" y="230" font-size="16" font-family="sans-serif">Date: ',
            dateOfPurchase[ownerOf(tokenId)],
            '</text><text x="20" y="250" font-size="16" font-family="sans-serif">Receipt: #',
            uint2str(tokenId),
            " - ",
            uint2str(stock),
            '</text><rect x="20" y="260" width="90%" height="1" /><text x="20" y="96%" font-size="16" font-family="sans-serif">Bought on Shopify</text>',
            '<?xml version="1.0" encoding="utf-8"?><svg x="160" y="90%" width="25px" height="25px" viewBox="0 0 292 292" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357-1.055-.088-23.383-1.743-23.383-1.743s-15.507-15.395-17.209-17.099c-1.703-1.703-5.029-1.185-6.32-.805-.19.056-3.388 1.043-8.678 2.68-5.18-14.906-14.322-28.604-30.405-28.604-.444 0-.901.018-1.358.044C129.31 3.407 123.644.779 118.75.779c-37.465 0-55.364 46.835-60.976 70.635-14.558 4.511-24.9 7.718-26.221 8.133-8.126 2.549-8.383 2.805-9.45 10.462C21.3 95.806.038 260.235.038 260.235l165.678 31.042 89.77-19.42S223.973 58.8 223.775 57.34zM156.49 40.848l-14.019 4.339c.005-.988.01-1.96.01-3.023 0-9.264-1.286-16.723-3.349-22.636 8.287 1.04 13.806 10.469 17.358 21.32zm-27.638-19.483c2.304 5.773 3.802 14.058 3.802 25.238 0 .572-.005 1.095-.01 1.624-9.117 2.824-19.024 5.89-28.953 8.966 5.575-21.516 16.025-31.908 25.161-35.828zm-11.131-10.537c1.617 0 3.246.549 4.805 1.622-12.007 5.65-24.877 19.88-30.312 48.297l-22.886 7.088C75.694 46.16 90.81 10.828 117.72 10.828z" fill="#95BF46"/><path d="M221.237 54.983c-1.055-.088-23.383-1.743-23.383-1.743s-15.507-15.395-17.209-17.099c-.637-.634-1.496-.959-2.394-1.099l-12.527 256.233 89.762-19.418S223.972 58.8 223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357" fill="#5E8E3E"/><path d="M135.242 104.585l-11.069 32.926s-9.698-5.176-21.586-5.176c-17.428 0-18.305 10.937-18.305 13.693 0 15.038 39.2 20.8 39.2 56.024 0 27.713-17.577 45.558-41.277 45.558-28.44 0-42.984-17.7-42.984-17.7l7.615-25.16s14.95 12.835 27.565 12.835c8.243 0 11.596-6.49 11.596-11.232 0-19.616-32.16-20.491-32.16-52.724 0-27.129 19.472-53.382 58.778-53.382 15.145 0 22.627 4.338 22.627 4.338" fill="#FFF"/></svg></svg>'
            "</svg>"
        );

        string memory json = string.concat(
            '{"name":"Receipt #',
            uint2str(tokenId),
            '","description":"Receipt for a shopify purchase stored on chain.","image":"data:image/svg+xml;base64,',
            Base64.encode(bytes(svg)),
            '"}'
        );

        return
            string.concat(
                "data:application/json;base64,",
                Base64.encode(bytes(json))
            );
    }

    function totalSupply() external view returns (uint256) {
        return _totalSupply;
    }
}
